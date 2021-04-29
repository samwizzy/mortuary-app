import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import DeceasedTableHead from './DeceasedTableHead';
// import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';

function DeceasedList(props) {
  const dispatch = useDispatch();
  const deceased = [
    {
      id: '5725a680b3249760ea21de52',
      firstName: 'Emah',
      lastName: 'Thompson',
      age: '32',
      placeOfDeath: 'Lagos',
      dateOfDeath: '2021-04-22',
      status: 'Released',
    },
    {
      id: '5725a680606588342058356d',
      firstName: 'Arnold',
      lastName: 'Thompson',
      age: '32',
      placeOfDeath: 'Lagos',
      dateOfDeath: '2021-04-22',
      status: 'Released',
    },
    {
      id: '5725a68009e20d0a9e9acf2a',
      firstName: 'Arnold',
      lastName: 'Thompson',
      age: '32',
      placeOfDeath: 'Lagos',
      dateOfDeath: '2021-04-22',
      status: 'Released',
    },
  ];
  const searchText = '';

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(deceased);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    // dispatch(Actions.getProducts());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? deceased
        : _.filter(deceased, (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [deceased, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({ direction, id });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push('/deceased/' + item.id + '/' + item.handle);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <DeceasedTableHead
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-64 cursor-pointer'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className='w-48 px-4 sm:px-12'
                      padding='checkbox'
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {`${n.firstName} ${n.lastName}`}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.id}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.age}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.placeOfDeath}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.dateOfDeath}
                    </TableCell>

                    <TableCell component='th' scope='row' align='right'>
                      {n.status}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(DeceasedList);

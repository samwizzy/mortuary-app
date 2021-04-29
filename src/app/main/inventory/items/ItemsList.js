import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import ItemsTableHead from './ItemsTableHead';
// import * as Actions from '../store/actions';

function ItemsList(props) {
  const dispatch = useDispatch();
  const deceased = [
    {
      id: '5725a680b3249760ea21de52',
      itemName: "Ivy's Soap",
      avatar: 'assets/images/avatars/Abbott.jpg',
      unitPrice: '3200',
      stock: 300,
    },
    {
      id: '5725a680606588342058356d',
      itemName: 'Lotion',
      avatar: 'assets/images/avatars/Arnold.jpg',
      unitPrice: '3200',
      stock: 300,
    },
    {
      id: '5725a68009e20d0a9e9acf2a',
      itemName: 'Hamper',
      avatar: 'assets/images/avatars/Barrera.jpg',
      unitPrice: '3200',
      stock: 300,
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
    props.history.push('/inventory/items/' + item.id + '/' + item.handle);
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
          <ItemsTableHead
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

                    <TableCell
                      className='w-52'
                      component='th'
                      scope='row'
                      padding='none'
                    >
                      {n.avatar ? (
                        <img
                          className='w-full block rounded'
                          src={n.avatar}
                          alt={n.itemName}
                        />
                      ) : (
                        <img
                          className='w-full block rounded'
                          src='assets/images/ecommerce/product-image-placeholder.png'
                          alt={n.itemName}
                        />
                      )}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {n.itemName}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.id}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.unitPrice}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.stock}
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

export default withRouter(ItemsList);

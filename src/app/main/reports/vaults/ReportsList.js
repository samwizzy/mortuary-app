import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import ReportsTableHead from './ReportsTableHead';
// import * as Actions from '../store/actions';

function ReportsList(props) {
  const searchText = '';

  const vaultData = useSelector(({reportsApp}) => reportsApp.reports.vaults)
  const vaults = vaultData.cremations;
  const totalItems = vaultData.totalItems;
  const currentPage = vaultData.currentPage;

  console.log(vaultData, "vaultData")

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(vaults);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    setData(
      searchText.length === 0
        ? vaults
        : _.filter(vaults, (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [vaults, searchText]);

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
    props.history.push('/reports/vaults/' + item.id);
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
      <FuseAnimate delay={100}>
        <div className='flex justify-center flex-wrap mt-4 mb-16'>
          <div className='px-4 pb-5 sm:px-6 text-center'>
            <img
              className='h-72'
              src='/assets/images/profile/omega-homes.svg'
              alt=''
            />
            <h3 className='text-base leading-4 font-bold text-gray-900'>
              Daily Morgue Report
            </h3>
            <p className='text-sm'>As of 20th Jul, 2020</p>
          </div>
        </div>
      </FuseAnimate>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <ReportsTableHead
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
                      {n.dateReceived}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.accountId}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.accountype}
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
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={currentPage}
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

export default withRouter(ReportsList);
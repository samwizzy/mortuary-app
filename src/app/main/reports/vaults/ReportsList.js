import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import moment from 'moment';
import ReportsTableHead from './ReportsTableHead';

function ReportsList(props) {
  const searchText = '';

  const form = useSelector(({ reportsApp }) => reportsApp.reports.form);
  const vaultData = useSelector(({ reportsApp }) => reportsApp.reports.vaults);
  const vaults = vaultData.vaults;
  const totalItems = vaultData.totalItems;
  const currentPage = vaultData.currentPage;

  console.log(vaultData, 'vaultData');

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
            item.vault_number.toLowerCase().includes(searchText.toLowerCase())
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
            <p className='text-sm'>
              {form.startDate &&
                `As of ${moment(form.startDate).format('Do MMM, YYYY')}`}
            </p>
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
                    <TableCell component='th' scope='row'>
                      {n.deceased?.length}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.vault_number}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.vault_type}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.purchaser_one ? n.purchaser_one?.name : '—'}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.purchaser_two ? n.purchaser_two?.name : '—'}
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

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
import InvoicesTableHead from './ReceiptsTableHead';
// import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';

function ReceiptsList(props) {
  const dispatch = useDispatch();
  const invoices = [
    {
      id: '5725a680b3249760ea21de52',
      noOfItems: 8,
      billTo: 'Thompson',
      invoiceDate: '2021-04-22',
      totalAmount: 500000,
      amountDue: 500000,
    },
    {
      id: '5725a680606588342058356d',
      noOfItems: 8,
      billTo: 'Thompson',
      invoiceDate: '2021-04-22',
      totalAmount: 500000,
      amountDue: 500000,
    },
    {
      id: '5725a68009e20d0a9e9acf2a',
      noOfItems: 8,
      billTo: 'Thompson',
      invoiceDate: '2021-04-22',
      totalAmount: 500000,
      amountDue: 500000,
    },
  ];
  const searchText = '';

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(invoices);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    // dispatch(Actions.getProducts());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? invoices
        : _.filter(invoices, (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [invoices, searchText]);

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
    props.history.push('/receipts/' + item.id + '/' + item.handle);
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
          <InvoicesTableHead
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
                      {n.id}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.noOfItems}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.invoiceDate}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.billTo}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.totalAmount}
                    </TableCell>

                    <TableCell component='th' scope='row' align='right'>
                      {n.amountDue}
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

export default withRouter(ReceiptsList);

import React from 'react';
import { useSelector } from "react-redux"
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  IconButton,
  MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';

function SelectServices(props) {
  const { form, handleMultiChange, addServiceRow, removeServiceRow } = props;
  const serviceReducer = useSelector(({customerApp}) => customerApp.services);
  const discountsReducer = useSelector(({customerApp}) => customerApp.discounts);

  const services = serviceReducer.services.services;
  const discounts = discountsReducer.discounts;

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <TableHead>
            <TableRow>
              <TableCell>Services</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Discount Type</TableCell>
              <TableCell>Discount Amount</TableCell>
              <TableCell align='left'>
                <IconButton onClick={addServiceRow}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {form.service.map((n, i) => {
              const isSelected = form.service.indexOf(n.id) !== -1;
              return (
                <TableRow
                  className='h-64 cursor-pointer'
                  hover
                  role='checkbox'
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={i}
                  selected={isSelected}
                  onClick={() => {}}
                >
                  <TableCell component='th' scope='row'>
                    <TextField
                      className='mt-8 mb-16 min-w-192'
                      select
                      required
                      label='Services'
                      autoFocus
                      id={`service_id-${i}`}
                      name='service_id'
                      value={n.service_id}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      fullWidth
                    >
                      <MenuItem value="">Select Services</MenuItem>
                      {services.map(s => 
                        <MenuItem key={s.id} value={s.id}>{s.service_name}</MenuItem>
                      )}
                    </TextField>  
                  </TableCell>

                  <TableCell className='truncate' component='th' scope='row'>
                    <TextField
                      className='mt-8 mb-16'
                      required
                      label='Rate'
                      autoFocus
                      id={`rate-${i}`}
                      name='rate'
                      value={n.rate}
                      // onChange={handleMultiChange(i)}
                      variant='outlined'
                      fullWidth
                    />
                  </TableCell>

                  <TableCell className='truncate' component='th' scope='row'>
                    <TextField
                      className='mt-8 mb-16 w-128'
                      required
                      label='Days'
                      autoFocus
                      id={`days-${i}`}
                      name='days'
                      value={n.days}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      fullWidth
                    />
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    <TextField
                      className='mt-8 mb-16 min-w-128'
                      select
                      required
                      label='Discount Types'
                      autoFocus
                      id={`discount_type_id-${i}`}
                      name='discount_type_id'
                      value={n.discount_type_id}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      fullWidth
                    >
                      <MenuItem value="">Select discount type</MenuItem>
                      {discounts.map(d => 
                        <MenuItem key={d.id} value={d.id}>{d.discount_name}</MenuItem>
                      )}
                    </TextField>  
                  </TableCell>

                  <TableCell component='th' scope='row'>
                    <TextField
                      className='mt-8 mb-16'
                      required
                      label='Discount Amount'
                      autoFocus
                      id={`discount_amount-${i}`}
                      name='discount_amount'
                      value={n.discount_amount}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      fullWidth
                    />
                  </TableCell>
                  <TableCell className='' padding='checkbox'>
                    <IconButton onClick={removeServiceRow(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
}

export default withRouter(SelectServices);

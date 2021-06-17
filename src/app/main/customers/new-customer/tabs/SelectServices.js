import React from 'react';
import { useSelector } from "react-redux"
import _ from "lodash";
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
import {Autocomplete} from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';

function SelectServices(props) {
  const { form, handleMultiChange, handleSelectChange, addServiceRow, removeServiceRow } = props;
  const serviceReducer = useSelector(({customerApp}) => customerApp.services);
  const discountsReducer = useSelector(({customerApp}) => customerApp.discounts);

  const services = serviceReducer.services.services;
  const discounts = discountsReducer.discounts;

  console.log(services, "services")

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <TableHead>
            <TableRow>
              <TableCell>Services</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Days/Qty</TableCell>
              <TableCell>Discount</TableCell>
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
                      id={`rate-${i}`}
                      name='rate'
                      value={n.rate}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      fullWidth
                    />
                  </TableCell>

                  <TableCell className='truncate' component='th' scope='row'>
                    <TextField
                      className='mt-8 mb-16 w-128'
                      required
                      label='Days/Qty'
                      id={`qty-${i}`}
                      name='qty'
                      value={n.qty}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      disabled={_.find(services, {id: n.service_id})?.service_type === "2"}
                      fullWidth
                    />
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    {/* <TextField
                      className='mt-8 mb-16 min-w-128'
                      select
                      required
                      label='Discount Types'
                      id={`discount-${i}`}
                      name='discount'
                      value={n.discount}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      fullWidth
                    >
                      <MenuItem value="">Select discount type</MenuItem>
                      {discounts.map(d => 
                        <MenuItem key={d.id} value={d.amount}>{d.discount_name} ( {d.amount}% )</MenuItem>
                      )}
                    </TextField>   */}

                    <Autocomplete
                      className='mt-8 mb-24'
                      value={n.discount}
                      onChange={(ev, value) => handleSelectChange(value, 'discount', i)}
                      placeholder='Select discount type'
                      options={discounts}
                      getOptionLabel={(option) => (`${option.discount_name} (${option.amount}%)`)}
                      renderInput={(params) => <TextField {...params} label="Discount types" variant="outlined" />}
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

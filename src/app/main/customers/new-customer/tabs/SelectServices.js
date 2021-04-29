import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { FuseScrollbars, FuseChipSelect } from '@fuse';
import { withRouter } from 'react-router-dom';

// const services = [];
// const discountTypes = [];

function SelectServices(props) {
  const { form, handleChange, handleChipChange } = props;

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <TableHead>
            <TableRow>
              <TableCell>Services</TableCell>
              <TableCell>Billing Amount</TableCell>
              <TableCell>Discount Type</TableCell>
              <TableCell>Discount Amount</TableCell>
              <TableCell align='left'>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {form.services.map((n, i) => {
              const isSelected = form.services.indexOf(n.id) !== -1;
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
                    <FuseChipSelect
                      className='mt-8 mb-16'
                      value={[]}
                      onChange={(value) => handleChipChange(value, 'services')}
                      placeholder=''
                      textFieldProps={{
                        label: 'Services',
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: 'outlined',
                      }}
                      isMulti
                    />
                  </TableCell>

                  <TableCell className='truncate' component='th' scope='row'>
                    <TextField
                      className='mt-8 mb-16'
                      required
                      label='Billing Amount'
                      autoFocus
                      id='name'
                      name='name'
                      value={form.firstName}
                      onChange={handleChange}
                      variant='outlined'
                      fullWidth
                    />
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    <FuseChipSelect
                      className='mt-8 mb-16'
                      value={[]}
                      onChange={(value) =>
                        handleChipChange(value, 'discountType')
                      }
                      placeholder=''
                      textFieldProps={{
                        label: 'Discount types',
                        InputLabelProps: {
                          shrink: true,
                        },
                        variant: 'outlined',
                      }}
                      isMulti
                    />
                  </TableCell>

                  <TableCell component='th' scope='row' align='right'>
                    <TextField
                      className='mt-8 mb-16'
                      required
                      label='Discount Amount'
                      autoFocus
                      id='name'
                      name='name'
                      value={form.firstName}
                      onChange={handleChange}
                      variant='outlined'
                      fullWidth
                    />
                  </TableCell>
                  <TableCell className='' padding='checkbox'>
                    <IconButton>
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

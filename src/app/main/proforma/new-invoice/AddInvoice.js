import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FusePageCarded, FuseScrollbars, /*FuseUtils*/ } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import { Button, IconButton, MenuItem, TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import AddInvoiceHeader from "./AddInvoiceHeader"
import AddInvoiceToolbar from "./AddInvoiceToolbar"
import moment from 'moment';

const styles = (theme) => ({
  layoutRoot: {},
});

function AddInvoice(props) {
  const { classes, generateProformaInvoice, services } = props;

  const [form, setForm] = useState({
    family_name: "",
    email: "",
    phone_number: "",
    contact_person: "",
    invoice_date: moment().format("YYYY-MM-DDTHH:mm:ss"),
    address: "",
    service: [
      { service_id: '', rate: '' }
    ],
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  function addServiceRow() {
    const newRole = { service_id: '', rate: '' }
    setForm({...form, service: [ ...form.service, newRole ]});
  }

  const removeServiceRow = (i) => () => {
    setForm({ ...form, service: form.service.filter((s, k) => k !== i)});
  }

  const handleMultiChange = i => event => {
    const { name, value } = event.target
    const { service } = form
    if(name === "service_id"){
      const serv = services.find(s => s.id === value)
      service[i][name] = serv.id
      service[i].rate = serv.amount
    }else{
      service[i][name] = value
    }
    setForm({ ...form, service });
  }

  const handleSubmit = () => {
    generateProformaInvoice(form);
  };

  console.log(form, "form")

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={
        <AddInvoiceHeader />
      }
      contentToolbar={
        <AddInvoiceToolbar />
      }
      content={
        <div className='w-full p-24'>
          <FuseScrollbars className='flex-grow overflow-x-auto pb-24'>
            <div className='w-8/12 grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Family name'
                autoFocus
                id='family_name'
                name='family_name'
                value={form.family_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Contact Person'
                autoFocus
                id='contact_person'
                name='contact_person'
                value={form.contact_person}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Email'
                autoFocus
                id='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Phone number'
                autoFocus
                id='phone_number'
                name='phone_number'
                value={form.phone_number}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Address'
                autoFocus
                id='address'
                name='address'
                value={form.address}
                onChange={handleChange}
                variant='outlined'
                multiline
                rows={2}
                rowsMax={4}
                fullWidth
              />
          
            </div>

            <div className="mb-24">
              <Table className='min-w-xl' aria-labelledby='tableTitle'>
                <TableHead>
                  <TableRow>
                    <TableCell>Services</TableCell>
                    <TableCell>Rate</TableCell>
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
                            className='mt-8 mb-16 min-w-96'
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
                            className='mt-8 mb-16 min-w-96'
                            required
                            label='Rate'
                            autoFocus
                            id={`rate-${i}`}
                            name='rate'
                            value={n.rate}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
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
            </div>      

            <Button color='primary' className='float-right' variant='contained' onClick={handleSubmit}>
              Generate
            </Button>
          </FuseScrollbars>
        </div>
      }
      innerScroll
    />
  );
}

const mapStateToProps = ({proformaApp}) => {
  const { customer, services, discounts } = proformaApp

  return {
    customers: customer.customers.customers,
    services: services.services.services,
    discounts: discounts.discounts,
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    generateProformaInvoice: Actions.generateProformaInvoice,
  }, dispatch);
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(AddInvoice));

import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FusePageSimple, FuseScrollbars, FuseChipSelect } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import {
  Button,
  Checkbox,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

const styles = (theme) => ({
  layoutRoot: {},
});

const types = ["Fixed", "Recurrent"].map(type => ({
  label: type,
  value: type.toLowerCase(),
}));

function AddServices(props) {
  const { classes, createService } = props;

  const [form, setForm] = useState({
    service_name: "",
    service_type: null,
    amount: "",
    is_admisson: true,
    is_customer_image: true,
    request_customer_signature: true,
    discountType: "recurrent",
    rate: "25.0", 
    discountAmount: "2000"
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    createService(form);
  };

  const handleCheckChange = (event) => {
    setForm({
      ...form,
      [event.target.value]: event.target.checked,
    });
  };

  const handleChipChange = (value, name) => {
    setForm({...form, [name]: value.value})
  };

  console.log(form, "form")

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className='px-24'>
          <h4 className='text-lg'>Add Service</h4>
        </div>
      }
      content={
        <div className='p-24 w-8/12'>
          <FuseScrollbars className='flex-grow overflow-x-auto'>
            <div className='grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Service Name'
                autoFocus
                id='service_name'
                name='service_name'
                value={form.service_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <FuseChipSelect
                className='mt-8 mb-24'
                value={types.find(type => type.label === form.service_type)}
                onChange={(value) => handleChipChange(value, 'service_type')}
                placeholder='Select service type'
                textFieldProps={{
                  label: 'Service Type',
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: 'outlined',
                }}
                options={types}
              />

              <FuseChipSelect
                className='mt-8 mb-24'
                value={types.find(type => type.label === form.discountType)}
                onChange={(value) => handleChipChange(value, 'discountType')}
                placeholder='Select discount type'
                textFieldProps={{
                  label: 'Discount Type',
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: 'outlined',
                }}
                options={types}
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Discount Amount'
                autoFocus
                id='discount-amount'
                name='discountAmount'
                value={form.discountAmount}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Amount'
                autoFocus
                id='amount'
                name='amount'
                value={form.amount}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Rate'
                autoFocus
                id='rate'
                name='rate'
                value={form.rate}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <FormControl
                required
                error={false}
                component='fieldset'
                className={classes.formControl}
              >
                <FormLabel component='legend'>Pick two</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.is_customer_image}
                        onChange={handleCheckChange}
                        value='is_customer_image'
                      />
                    }
                    label='Request Customer Image '
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.is_admisson}
                        onChange={handleCheckChange}
                        value='is_admisson'
                      />
                    }
                    label='Admission needed'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.request_customer_signature}
                        onChange={handleCheckChange}
                        value='request_customer_signature'
                      />
                    }
                    label='Request Customer Signature '
                  />
                </FormGroup>
              </FormControl>
            </div>
            <Button color='primary' className='float-right' variant='contained' onClick={handleSubmit}>
              save
            </Button>
          </FuseScrollbars>
        </div>
      }
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createService: Actions.createService,
  }, dispatch);
};

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(AddServices)));

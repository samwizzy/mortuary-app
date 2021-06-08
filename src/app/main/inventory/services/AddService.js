import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FuseAnimate, FuseScrollbars, FusePageCarded, FuseChipSelect } from '@fuse';
import { Icon, Typography } from '@material-ui/core';
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
import { types } from "./Services"

const styles = (theme) => ({
  layoutRoot: {},
});

function AddServices(props) {
  const { classes, createService } = props;

  const [form, setForm] = useState({
    service_name: "",
    service_type: null,
    amount: "",
    is_admisson: true,
    is_customer_image: true,
    request_customer_signature: true,
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
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={
        <div className='flex flex-1 w-full items-center justify-between'>
          <div className='flex flex-col'>
            <FuseAnimate animation='transition.slideRightIn' delay={300}>
              <Typography
                className='normal-case flex items-center sm:mb-12'
                component={Link}
                role='button'
                to='/inventory/services'
                color='inherit'
              >
                <Icon className='mr-4 text-20'>arrow_back</Icon>
                Services
              </Typography>
            </FuseAnimate>

            <div className='flex items-center max-w-full'>
              <div className='flex min-w-0'>
                <FuseAnimate animation='transition.slideLeftIn' delay={300}>
                  <Typography className='hidden sm:flex' variant='h6'>
                    Add Service
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      }
      contentToolbar={
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
      innerScroll
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createService: Actions.createService,
  }, dispatch);
};

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(AddServices)));

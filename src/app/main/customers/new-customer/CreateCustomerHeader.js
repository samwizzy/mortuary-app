import React from 'react';
import _ from 'lodash';
import {useLocation} from "react-router-dom"
import qs from "qs";
import { Button, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';

function CustomersHeader(props) {
  const { form } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const customerId = qs.parse(location.search, { ignoreQueryPrefix: true }).customerId

  function canBeSubmitted() {
    return form.deceased.first_name.length > 0 && !_.isEqual({}, form);
  }

  const handleSubmit = () => {
    customerId 
    ? dispatch(Actions.createReturningCustomer(form, customerId))
    : dispatch(Actions.createCustomer(form))
  }

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex flex-col items-start max-w-full'>
        <FuseAnimate animation='transition.slideRightIn' delay={300}>
          <Typography
            className='normal-case flex items-center sm:mb-12'
            component={Link}
            role='button'
            to='/customers'
            color='inherit'
          >
            <Icon className='mr-4 text-20'>arrow_back</Icon>
            Customers
          </Typography>
        </FuseAnimate>

        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0'>
            <FuseAnimate animation='transition.slideLeftIn' delay={300}>
              <Typography className='text-16 sm:text-20 truncate'>
                New Customer
              </Typography>
            </FuseAnimate>
            <FuseAnimate animation='transition.slideLeftIn' delay={300}>
              <Typography variant='caption'>Create a new Customer</Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>
      <FuseAnimate animation='transition.slideRightIn' delay={300}>
        <Button
          className='whitespace-no-wrap'
          variant='contained'
          disabled={!canBeSubmitted()}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default CustomersHeader;

import React from 'react';
import _ from 'lodash';
import { Button, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as Actions from '../store/actions';

function CustomersHeader(props) {
  const { form } = props;
  // const dispatch = useDispatch();
  // const searchText = '';

  function canBeSubmitted() {
    return form.firstName.length > 0 && !_.isEqual({}, form);
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
          {/* <FuseAnimate animation='transition.expandIn' delay={300}>
            {form.images ? (
              <img
                className='w-32 sm:w-48 mr-8 sm:mr-16 rounded'
                src={form.avatar}
                alt={form.name}
              />
            ) : (
              <img
                className='w-32 sm:w-48 mr-8 sm:mr-16 rounded'
                src='assets/images/ecommerce/product-image-placeholder.png'
                alt={form.name}
              />
            )}
          </FuseAnimate> */}
          <div className='flex flex-col min-w-0'>
            <FuseAnimate animation='transition.slideLeftIn' delay={300}>
              <Typography className='text-16 sm:text-20 truncate'>
                {form.firstName ? form.firstName : 'New Customer'}
              </Typography>
            </FuseAnimate>
            <FuseAnimate animation='transition.slideLeftIn' delay={300}>
              <Typography variant='caption'>Customer Detail</Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>
      <FuseAnimate animation='transition.slideRightIn' delay={300}>
        <Button
          className='whitespace-no-wrap'
          variant='contained'
          disabled={!canBeSubmitted()}
          // onClick={() => dispatch(Actions.saveProduct(form))}
        >
          Save
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default CustomersHeader;

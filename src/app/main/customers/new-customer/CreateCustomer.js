import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { FusePageCarded } from '@fuse';
import { Tab, Tabs } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import CustomerHeader from '../customer/CustomerHeader';
// import withReducer from 'app/store/withReducer';
// import reducer from '../store/reducers';
import CustomerInfo from './tabs/CustomerInfo';
import SelectServices from './tabs/SelectServices';
import CustomerImages from './tabs/CustomerImages';
import DeceasedImages from './tabs/DeceasedImages';
import DeceasedInfo from './tabs/DeceasedInfo';

function CreateCustomer() {
  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm } = useForm({
    firstName: '',
    lastName: '',
    otherName: '',
    email: '',
    relationship: '',
    phone: '',
    address: '',
    services: [
      { title: '', billingAmount: '', discountType: '', discountAmount: '' },
    ],
    images: [],
    signature: '',
    deceased: {
      firstName: '',
      lastName: '',
      otherName: '',
      age: '',
      gender: '',
      image: null,
      address: '',
      placeOfDeath: '',
      dateOfDeath: '',
      timeOfDeath: '',
      casualty: '',
      death: '',
      supportingDoc: '',
      hospitalName: '',
      hospitalRecord: '',
      hospitalAttendant: '',
      hospitalAddress: '',
    },
  });

  function handleChipChange(value, name) {
    setForm(
      _.set(
        { ...form },
        name,
        value.map((item) => item.value)
      )
    );
  }

  useEffect(() => {
    // setForm();
  }, [setForm]);

  const handleDateChange = (name) => (date) => {
    setForm({ ...form, [name]: date });
  };

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<CustomerHeader form={form} />}
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor='secondary'
          textColor='secondary'
          variant='scrollable'
          scrollButtons='auto'
          classes={{ root: 'w-full h-64' }}
        >
          <Tab className='h-64 normal-case' label='Customer Info' />
          <Tab className='h-64 normal-case' label='Select Services' />
          <Tab className='h-64 normal-case' label='Images & Signature' />
          <Tab className='h-64 normal-case' label='Deceased Info' />
          <Tab className='h-64 normal-case' label='Deceased Documents' />
        </Tabs>
      }
      content={
        <div className='p-16 sm:p-24 w-full'>
          {' '}
          {/* max-w-2xl */}
          {tabValue === 0 && (
            <CustomerInfo
              form={form}
              handleChange={handleChange}
              handleChipChange={handleChipChange}
            />
          )}
          {tabValue === 1 && (
            <SelectServices
              form={form}
              handleChange={handleChange}
              handleChipChange={handleChipChange}
            />
          )}
          {tabValue === 2 && (
            <CustomerImages form={form} handleChange={handleChange} />
          )}
          {tabValue === 3 && (
            <DeceasedInfo
              form={form}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
            />
          )}
          {tabValue === 4 && (
            <DeceasedImages form={form} handleChange={handleChange} />
          )}
        </div>
      }
      innerScroll
    />
  );
}

// export default withReducer('customerApp', reducer)(Customer);
export default CreateCustomer;

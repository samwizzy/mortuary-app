import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux"
import _ from 'lodash';
import moment from 'moment';
import { FusePageCarded, FuseUtils } from '@fuse';
import { Tab, Tabs } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import CreateCustomerHeader from './CreateCustomerHeader';
import CustomerInfo from './tabs/CustomerInfo';
import SelectServices from './tabs/SelectServices';
import CustomerImages from './tabs/CustomerImages';
import DeceasedImages from './tabs/DeceasedImages';
import DeceasedInfo from './tabs/DeceasedInfo';

function CreateCustomer(props) {
  const { discounts } = props
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm({
    first_name: '',
    last_name: '',
    other_name: '',
    address: '',
    email: '',
    phone_number: '',
    relationship_with_deceased: '',
    customer_image: '',
    signature: '',
    age: '',
    service: [
      { service_id: '', rate: '', discount_type_id: '', discount_amount: '' },
    ],
    relative: {
      first_name: "",
      last_name: "",
      other_name: "",
      address: "", 
      email: "",
      phone_number: "", 
      age: "",
      relationship_with_deceased: "" 
    },
    deceased: {
      first_name: '',
      last_name: '',
      other_name: '',
      gender: '',
      age: '',
      address: '',
      place_of_death: '',
      dateof_assertion: moment().format("YYYY-MM-DDTHH:mm:ss"),
      time_of_Death: '',
      cause_of_death: '',
      how_was_death_assertained: "",
      name_of_hospital: '',
      medical_attendant_name: '',
      hospital_address: '',
      status: 'DEFAULT',
      deceased_image: null,
      record_of_death_from_hospital: '',
      supporting_document: '',
    },
  });

  function handleChipChange(value, name) {
    setForm(_.set({ ...form }, name, value.value));
  }

  function addServiceRow() {
    const newRole = { service_id: '', rate: '', discount_type_id: '', discount_amount: '' }
    setForm({...form, service: [ ...form.service, newRole ]});
  }

  const removeServiceRow = (i) => () => {
    setForm({ ...form, service: form.service.filter((s, k) => k !== i)});
  }

  const handleImageUpload = (name, files) => {
    FuseUtils.toBase64(files[0]).then(data => {
      // setForm({ ...form, [name]: data});
      setForm(_.set({ ...form }, name, data));
    })
  }

  const handleMultiChange = i => event => {
    const { name, value } = event.target
    const { service } = form
    if(name === "discount_type_id"){
      const discount = discounts.find(d => d.id === value)
      service[i][name] =  discount.id
      service[i].discount_amount = discount.amount
    }else{
      service[i][name] = value
    }
    setForm({ ...form, service });
  }

  useEffect(() => {
    dispatch(Actions.getServices())
    dispatch(Actions.getDiscounts())
    // setForm();
  }, [setForm, dispatch]);

  const handleDateChange = (name) => (date) => {
    setForm(_.set({ ...form }, name, moment(date).format("YYYY-MM-DDTHH:mm:ss")));
  };

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  console.log(form, "form create customer")
  console.log(discounts, "discounts")

  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<CreateCustomerHeader form={form} />}
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
              handleMultiChange={handleMultiChange}
              addServiceRow={addServiceRow}
              removeServiceRow={removeServiceRow}
            />
          )}
          {tabValue === 2 && (
            <CustomerImages form={form} handleImageUpload={handleImageUpload} />
          )}
          {tabValue === 3 && (
            <DeceasedInfo
              form={form}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
            />
          )}
          {tabValue === 4 && (
            <DeceasedImages form={form} handleImageUpload={handleImageUpload} />
          )}
        </div>
      }
      innerScroll
    />
  );
}

const mapStateToProps = ({customerApp}) => {
  return {
    discounts: customerApp.discounts.discounts
  }
}

export default withReducer('customerApp', reducer)(connect(mapStateToProps)(CreateCustomer));

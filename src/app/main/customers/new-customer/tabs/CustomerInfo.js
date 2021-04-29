import React, { Fragment } from 'react';
import { Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
// import { makeStyles } from '@material-ui/styles';
import { FuseChipSelect } from '@fuse';

function CustomerInfo(props) {
  const { form, handleChange, handleChipChange } = props;

  return (
    <Fragment>
      <div className='grid grid-cols-2 gap-x-24'>
        <TextField
          className='mt-8 mb-16'
          required
          label='First Name'
          autoFocus
          id='name'
          name='name'
          value={form.firstName}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />

        <TextField
          className='mt-8 mb-16'
          required
          label='Last Name'
          autoFocus
          id='name'
          name='name'
          value={form.lastName}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />

        <TextField
          className='mt-8 mb-16'
          required
          label='Other Name'
          autoFocus
          id='other-name'
          name='otherName'
          value={form.otherName}
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

        <FuseChipSelect
          className='mt-8 mb-24'
          value={[]}
          onChange={(value) => handleChipChange(value, 'categories')}
          placeholder='Select multiple categories'
          textFieldProps={{
            label: 'Relationship with Deceased',
            InputLabelProps: {
              shrink: true,
            },
            variant: 'outlined',
          }}
          isMulti
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
          fullWidth
        />

        <TextField
          className='mt-8 mb-16'
          required
          label='Phone'
          autoFocus
          id='phone'
          name='phone'
          value={form.phone}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />
      </div>

      <Button color='primary'>
        <AddIcon /> Add Relatives
      </Button>
    </Fragment>
  );
}

export default CustomerInfo;

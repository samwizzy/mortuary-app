import React, { Fragment } from 'react';
import { TextField, MenuItem } from '@material-ui/core';

const relationships = ["Brother", "Sister", "Mother", "Father", "Son", "Daughter", "Others"].map(r => ({
  label: r,
  value: r,
}))

function CustomerInfo(props) {
  const { form, handleChange } = props;

  return (
    <Fragment>
      <div className='grid grid-cols-2 gap-x-24'>
        <TextField
          className='mt-8 mb-16'
          required
          label='First Name'
          autoFocus
          id='first-name'
          name='first_name'
          value={form.first_name}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />

        <TextField
          className='mt-8 mb-16'
          required
          label='Last Name'
          id='last-name'
          name='last_name'
          value={form.last_name}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />

        <TextField
          className='mt-8 mb-16'
          required
          label='Other Name'
          id='other-name'
          name='other_name'
          value={form.other_name}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />

        <TextField
          className='mt-8 mb-16'
          required
          label='Email'
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
          select
          label='Relationship with deceased'
          id='relationship_with_deceased'
          name='relationship_with_deceased'
          value={form.relationship_with_deceased}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        >
          <MenuItem value="">Select relation with deceased</MenuItem>
          {relationships.map(r => 
            <MenuItem key={r.value} value={r.value}>{r.value}</MenuItem>
          )}
        </TextField> 

        <TextField
          className='mt-8 mb-16'
          required
          label='Address'
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
          id='phone'
          name='phone_number'
          value={form.phone_number}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />
      </div>
    </Fragment>
  );
}

export default CustomerInfo;

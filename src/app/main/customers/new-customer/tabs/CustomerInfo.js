import React, { Fragment } from 'react';
import { Button, TextField, Accordion, AccordionSummary, AccordionDetails, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
// import { makeStyles } from '@material-ui/styles';

const relationships = ["Brother", "Sister"].map(r => ({
  label: r,
  value: r,
}))

function CustomerInfo(props) {
  const { form, handleChange } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


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
          autoFocus
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
          autoFocus
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
          select
          label='Relationship with deceased'
          autoFocus
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
          name='phone_number'
          value={form.phone_number}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />

        <TextField
          className='mt-8 mb-16'
          required
          label='Age'
          autoFocus
          id='age'
          name='age'
          value={form.age}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />
      </div>

      <div>
        <Accordion expanded={expanded === 'relatives'} onChange={handlePanelChange("relatives")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="relatives-content"
            id="relatives-header"
          >
            <Button className="" color="primary">Add Relatives</Button>
          </AccordionSummary>
          <AccordionDetails>

            <div className='w-full grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='First Name'
                autoFocus
                id='relative-first-name'
                name='relative.first_name'
                value={form.relative.first_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Last Name'
                autoFocus
                id='relative-last-name'
                name='relative.last_name'
                value={form.relative.last_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Other Name'
                autoFocus
                id='relative-other-name'
                name='relative.other_name'
                value={form.relative.other_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Email'
                autoFocus
                id='relative-email'
                name='relative.email'
                value={form.relative.email}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                select
                label='Relationship with deceased'
                autoFocus
                id='relative.relationship_with_deceased'
                name='relative.relationship_with_deceased'
                value={form.relative.relationship_with_deceased}
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
                autoFocus
                id='relative-address'
                name='relative.address'
                value={form.relative.address}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Phone'
                autoFocus
                id='relative-phone'
                name='relative.phone_number'
                value={form.relative.phone_number}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Age'
                autoFocus
                id='relative-age'
                name='relative.age'
                value={form.relative.age}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </Fragment>
  );
}

export default CustomerInfo;

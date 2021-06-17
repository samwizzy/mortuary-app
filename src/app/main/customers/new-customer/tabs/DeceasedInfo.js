import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const genders = ['Male', 'Female'].map((sex) => ({
  value: sex,
  label: sex,
}))

function DeceasedInfo(props) {
  const { form, handleChange, handleDateChange, handleTimeChange } = props;
  const [map, setMap] = useState('details');

  return (
    <div className='pb-24'>
      <Accordion
        elevation={1}
        expanded={map === 'details'}
        onChange={() => setMap(map !== 'details' ? 'details' : false)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className='text-lg font-600'>Deceased Details</Typography>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col md:flex-row'>
          <div className='w-full h-320'>
            <div className='grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='First Name'
                autoFocus
                id='deceased-first-name'
                name='deceased.first_name'
                value={form.deceased.first_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Other Name'
                autoFocus
                id='deceased-other-name'
                name='deceased.other_name'
                value={form.deceased.other_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Last Name'
                id='last_name'
                name='deceased.last_name'
                value={form.deceased.last_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Address'
                id='address'
                name='deceased.address'
                value={form.deceased.address}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Age'
                id='age'
                name='deceased.age'
                value={form.deceased.age}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                select
                label='Gender'
                id='deceased-gender'
                name='deceased.gender'
                value={form.deceased.gender}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              >
                <MenuItem value="">Select gender</MenuItem>
                {genders.map(g => 
                  <MenuItem key={g.value} value={g.value}>{g.value}</MenuItem>
                )}
              </TextField> 
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        elevation={1}
        expanded={map === 'assertion'}
        onChange={() => setMap(map !== 'assertion' ? 'assertion' : false)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className='text-lg font-600'>Death Assertion</Typography>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col md:flex-row'>
          <div className='w-full h-320'>
            <div className='grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Place of Death'
                autoFocus
                id='deceased_place_of_death'
                name='deceased.place_of_death'
                value={form.deceased.place_of_death}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  format="dd/MM/yyyy"
                  inputVariant='outlined'
                  id='date-of-death'
                  label='Date of assertion'
                  value={form.deceased.dateof_assertion}
                  onChange={handleDateChange("deceased.dateof_assertion")}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin='normal'
                  inputVariant='outlined'
                  format="hh:mm:ss a"
                  id='time-of-death'
                  label='Time of death'
                  value={form.deceased.time_of_death}
                  onChange={handleTimeChange("deceased.time_of_death")}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <TextField
                className='mt-8 mb-16'
                required
                label='Cause of death'
                autoFocus
                id='cause_of_death'
                name='deceased.cause_of_death'
                value={form.deceased.cause_of_death}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='How was death ascertained?'
                autoFocus
                id='how_was_death_assertained'
                name='deceased.how_was_death_assertained'
                value={form.deceased.how_was_death_assertained}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        elevation={1}
        expanded={map === 'medical'}
        onChange={() => setMap(map !== 'medical' ? 'medical' : false)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className='text-lg font-600'>Medical</Typography>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col md:flex-row'>
          <div className='w-full h-320'>
            <div className='grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Name of Hospital'
                autoFocus
                id='deceased-hospital-name'
                name='deceased.name_of_hospital'
                value={form.deceased.name_of_hospital}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Medical attendant Name'
                autoFocus
                id='deceased-hospital-attendant'
                name='deceased.medical_attendant_name'
                value={form.deceased.medical_attendant_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Hospital Address'
                autoFocus
                id='deceased-hospital-address'
                name='deceased.hospital_address'
                value={form.deceased.hospital_address}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default DeceasedInfo;

import React, { useState } from 'react';
import { FuseChipSelect } from '@fuse';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
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

function DeceasedInfo(props) {
  const { form, handleChange, handleChipChange, handleDateChange } = props;
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
                label='Age'
                autoFocus
                id='age'
                name='age'
                value={form.age}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <FuseChipSelect
                className='mt-8 mb-24'
                value={form.gender}
                onChange={(value) => handleChipChange(value, 'gender')}
                placeholder='Select gender'
                textFieldProps={{
                  label: 'Gender',
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: 'outlined',
                }}
                options={['Male', 'Female'].map((sex) => ({
                  value: sex,
                  label: sex,
                }))}
                isMulti
              />
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
                id='name'
                name='name'
                value={form.placeOfDeath}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  inputVariant='outlined'
                  id='date-of-death'
                  label='Date of death'
                  value={form.dateOfDeath}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin='normal'
                  inputVariant='outlined'
                  id='time-of-death'
                  label='Time of death'
                  value={form.timeOfDeath}
                  onChange={handleDateChange}
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
                id='casualty'
                name='casualty'
                value={form.casualty}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='How was death ascertained?'
                autoFocus
                id='death'
                name='death'
                value={form.death}
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
                id='hospital-name'
                name='hospitalName'
                value={form.hospitalName}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Medical attendant Name'
                autoFocus
                id='hospital-attendant'
                name='hospitalAttendant'
                value={form.hospitalAttendant}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Hospital Address'
                autoFocus
                id='hospital-address'
                name='hospitalAddress'
                value={form.hospitalAddress}
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

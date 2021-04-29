import React, { useState } from 'react';
import { FusePageSimple, FuseScrollbars, FuseChipSelect } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

const styles = (theme) => ({
  layoutRoot: {},
});

function Services(props) {
  const { classes } = props;

  const [form, setForm] = useState({
    name: '',
    type: '',
    amount: '',
    requirements: {
      customer: false,
      embalment: false,
      cremation: false,
      admission: false,
      image: false,
    },
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCheckChange = (event) => {
    console.log(event.target.value, 'value');
    console.log(event.target.checked, 'checked');
    setForm({
      ...form,
      requirements: {
        ...form.requirements,
        [event.target.value]: event.target.checked,
      },
    });
  };

  const handleChipChange = (value, name) => {};

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
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
                id='name'
                name='name'
                value={form.name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <FuseChipSelect
                className='mt-8 mb-24'
                value={[]}
                onChange={(value) => handleChipChange(value, 'type')}
                placeholder='Select type'
                textFieldProps={{
                  label: 'Type',
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: 'outlined',
                }}
                options={['Fixed', 'Recurrent'].map((type) => ({
                  label: type,
                  value: type,
                }))}
                isMulti
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
                        checked={form.requirements.customer}
                        onChange={handleCheckChange}
                        value='customer'
                      />
                    }
                    label='Request Customer Image '
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.requirements.embalment}
                        onChange={handleCheckChange}
                        value='embalment'
                      />
                    }
                    label='Is Embalment?'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.requirements.cremation}
                        onChange={handleCheckChange}
                        value='cremation'
                      />
                    }
                    label='Is Cremation?'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.requirements.admission}
                        onChange={handleCheckChange}
                        value='admission'
                      />
                    }
                    label='Admission needed'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.requirements.image}
                        onChange={handleCheckChange}
                        value='image'
                      />
                    }
                    label='Request Customer Image '
                  />
                </FormGroup>
              </FormControl>
            </div>
            <Button color='primary' className='float-right' variant='contained'>
              save
            </Button>
          </FuseScrollbars>
        </div>
      }
    />
  );
}

export default withStyles(styles, { withTheme: true })(Services);

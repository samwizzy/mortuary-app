import React, { useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
  CircularProgress,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import * as Actions from '../store/actions';
import { MenuItem } from '@material-ui/core';

const defaultFormState = {
  address: "",
  branch_id: "",
  date_buried: null,
  email_address: "",
  name_of_deceased: "",
  phone_number: "",
  purchaser_one: {name: "", email: ""},
  purchaser_two: {name: "", email: ""},
  vault_number: "",
  vault_type: ""
};

const vaultTypes = [
  { label: 'SINGLE VAULT', value: 'SINGLE_VAULT'}, 
  { label: 'DOUBLE VAULT', value: 'DOUBLE_VAULT'}, 
  { label: 'TRIPLE VAULT', value: 'TRIPLE_VAULT'}, 
  { label: 'FAMILY VAULT', value: 'FAMILY_VAULT'}
].map(plot => 
  <MenuItem key={plot.value} value={plot.label}>
    {plot.label}
  </MenuItem>
)

function VaultDialog(props) {
  const dispatch = useDispatch();
  const vaultDialog = useSelector(({ vaultsApp }) => vaultsApp.vaults.vaultDialog);
  const loading = useSelector(({ vaultsApp }) => vaultsApp.vaults.loading);
  const branches = useSelector(({ vaultsApp }) => vaultsApp.branches.branches);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  console.log(form, "form vaults")
  console.log(branches, "branches vaults")

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (vaultDialog.type === 'edit' && vaultDialog.data) {
      setForm({ ...vaultDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (vaultDialog.type === 'new') {
      setForm({
        ...defaultFormState,
      });
    }
  }, [vaultDialog.data, vaultDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (vaultDialog.props.open) {
      initDialog();
    }
  }, [vaultDialog.props.open, initDialog]);

  function closeComposeDialog() {
    vaultDialog.type === 'edit'
      ? dispatch(Actions.closeVaultDialog())
      : dispatch(Actions.closeVaultDialog());
  }

  function canBeSubmitted() {
    return (
      form.vault_type &&
      form.name_of_deceased &&
      form.email_address 
    );
  }

  const handleDateChange = (name) => (date) => {
    setForm({...form, [name]: moment(date).format("YYYY-MM-DDTHH:mm:ss")})
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (vaultDialog.type === 'new') {
      dispatch(Actions.createVault(form));
    } else {
      dispatch(Actions.updateVault(form, form.id));
    }
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...vaultDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex'>
          <Typography variant='subtitle1' color='inherit'>
            {vaultDialog.type === 'new'
              ? 'New Vault'
              : 'Edit Vault'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex'>
            <TextField
              className='mb-24'
              select
              label='Vault type'
              autoFocus
              id='vault_type'
              name='vault_type'
              value={form.vault_type}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            >
              <MenuItem value="">Select plot type</MenuItem>
              {vaultTypes}
            </TextField>      
          </div>

          <div className='flex'>
            <TextField
              className='mb-24'
              label='Email address'
              id='email_address'
              type="email"
              name='email_address'
              value={form.email_address}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex'>
            <TextField
              className='mb-24'
              label='Name of deceased'
              id='name_of_deceased'
              name='name_of_deceased'
              value={form.name_of_deceased}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex'>
            <TextField
              className='mb-24'
              label='Phone number'
              id='phone_number'
              name='phone_number'
              value={form.phone_number}
              type="number"
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex'>
            <TextField
              className='mb-16'
              select
              label='Branch'
              id='branch_id'
              name='branch_id'
              value={form.branch_id}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            >
              <MenuItem value="">Select branch</MenuItem>
              {branches.map(b => 
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              )}
            </TextField>  
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Purchaser one</label>
            <div className='flex items-start space-x-2'>
              <TextField
                className='mb-16'
                label='Name'
                id='purchaser_one_name'
                name='purchaser_one.name'
                value={form.purchaser_one.name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />
              <TextField
                className='mb-16'
                label='Email'
                type="email"
                id='purchaser_one_email'
                name='purchaser_one.email'
                value={form.purchaser_one.email}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Purchaser two</label>
            <div className='flex items-start space-x-2'>
              <TextField
                className='mb-24'
                label='Name'
                id='purchaser_two_name'
                name='purchaser_two.name'
                value={form.purchaser_two.name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              /> 
              <TextField
                className='mb-24'
                label='Email'
                type="email"
                id='purchaser_two_email'
                name='purchaser_two.email'
                value={form.purchaser_two.email}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              /> 
            </div>
          </div>

          <div className='flex'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                className='mb-16'
                inputVariant='outlined'
                format='MM/dd/yyyy'
                id='date_buried'
                label='Date buried'
                fullWidth
                value={form.date_buried}
                onChange={handleDateChange("date_buried")}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className='flex flex-col'>
            <div className='min-w-48 pt-0 mb-8'>
              <Typography>Address</Typography>
            </div>
            <TextField
              className='mb-8'
              label='Address'
              id='address'
              name='address'
              value={form.address}
              onChange={handleChange}
              variant='outlined'
              multiline
              rows={2}
              fullWidth
            />
          </div>
        </DialogContent>

        <DialogActions className='justify-end pr-32 py-16'>
        {vaultDialog.type === 'new' ? (
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            type='submit'
            disabled={!canBeSubmitted()}
            endIcon={loading && <CircularProgress size={16} />}
          >
            Add
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            type='submit'
            onClick={handleSubmit}
            disabled={!canBeSubmitted()}
            endIcon={loading && <CircularProgress size={16} />}
          >
            Update
          </Button>
        )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default VaultDialog;

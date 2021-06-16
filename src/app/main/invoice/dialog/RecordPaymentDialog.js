import React, { useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  Link,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import { FuseChipSelect } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import * as Actions from '../store/actions';
import InvoiceUploadImage from './InvoiceUploadImage';

const defaultFormState = {
  id: '',
  account_to_deposit: "",
  amount_received: 0,
  bank_changes: "",
  customer_name: "",
  file: "",
  notes: "",
  org_key: "",
  payment_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
  payment_method: "DEFAULT",
  receipt_number: ""
};


function RecordPaymentDialog(props) {
  const dispatch = useDispatch();
  const recordPaymentDialog = useSelector(
    ({ invoicesApp }) => invoicesApp.invoices.recordPaymentDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (recordPaymentDialog.type === 'edit' && recordPaymentDialog.data) {
      setForm({ ...recordPaymentDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (recordPaymentDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...recordPaymentDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [recordPaymentDialog.data, recordPaymentDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (recordPaymentDialog.props.open) {
      initDialog();
    }
  }, [recordPaymentDialog.props.open, initDialog]);

  function closeComposeDialog() {
    recordPaymentDialog.type === 'edit'
      ? dispatch(Actions.closeNewRecordPaymentDialog())
      : dispatch(Actions.closeNewRecordPaymentDialog());
  }

  function canBeSubmitted() {
    return form.customer_name.length > 0;
  }

  const handleDateChange = (name) => (date) => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') })
  };

  const handleChipChange = () => {};

  function handleSubmit(event) {
    event.preventDefault();

    if (recordPaymentDialog.type === 'new') {
      dispatch(Actions.addInvoice(form));
    } else {
      dispatch(Actions.updateInvoice(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeInvoice(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...recordPaymentDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            {recordPaymentDialog.type === 'new'
              ? 'Payment for INV/0000001'
              : 'Edit Payment'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
              label='Customer'
              autoFocus
              id='customer-name'
              name='customer_name'
              value={form.customer_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />

            <TextField
              className='mb-24'
              label='Receipt Number'
              autoFocus
              id='receipt-number'
              name='receipt_number'
              value={form.receipt_number}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex'>
            <TextField
              className='mb-24'
              label='Amount Received (NGN)'
              id='amount_received'
              name='amount_received'
              value={form.amount_received}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
              label='Bank Charges'
              id='bank-charges'
              name='bank_changes'
              value={form.bank_changes}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                inputVariant='outlined'
                format='MM/dd/yyyy'
                id='payment-date'
                label='Payment Date'
                fullWidth
                value={form.payment_date}
                onChange={handleDateChange("payment_date")}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <FuseChipSelect
              className='mt-0 mb-24 w-full'
              value={form.account_to_deposit}
              onChange={(value) => handleChipChange(value, 'account_to_deposit')}
              placeholder=''
              textFieldProps={{
                label: 'Amount to Deposit',
                InputLabelProps: {
                  shrink: true,
                },
                variant: 'outlined',
              }}
              options={['Cash', 'Transfer'].map((method) => ({
                label: method,
                value: method,
              }))}
              isMulti
            />
          </div>
          <div className='flex items-center space-x-2'>
            <FuseChipSelect
              className='mt-0 mb-24 w-full'
              value={form.payment_method}
              onChange={(value) => handleChipChange(value, 'payment_method')}
              placeholder='Method'
              textFieldProps={{
                label: 'Payment Method',
                InputLabelProps: {
                  shrink: true,
                },
                variant: 'outlined',
              }}
              options={['Cash', 'Transfer'].map((method) => ({
                label: method,
                value: method,
              }))}
              isMulti
            />
            <Link className='whitespace-no-wrap' href='/'>
              Add new
            </Link>
          </div>

          <div className='flex flex-col'>
            <div className='min-w-48 pt-20 mb-8'>
              <Typography>Notes</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Notes'
              id='notes'
              name='notes'
              value={form.notes}
              onChange={handleChange}
              variant='outlined'
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <div className='flex '>
            <InvoiceUploadImage />
          </div>
        </DialogContent>

        {recordPaymentDialog.type === 'new' ? (
          <DialogActions className='justify-between pl-16'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              type='submit'
              disabled={!canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className='justify-between pl-16'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              onClick={handleSubmit}
              disabled={!canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default RecordPaymentDialog;

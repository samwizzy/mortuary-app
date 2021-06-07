import React, { useEffect, useCallback } from 'react';
import _ from "lodash";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const defaultFormState = {
  id: '',
  amount: "",
  discount_name: "",
};

function DiscountDialog(props) {
  const dispatch = useDispatch();
  const discountDialog = useSelector(
    ({ inventoryApp }) => inventoryApp.discounts.discountDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (discountDialog.type === 'edit' && discountDialog.data) {
      setForm({ ...discountDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (discountDialog.type === 'new') {
      setForm({
        ..._.omit(defaultFormState, ["id"]),
        ...discountDialog.data,
      });
    }
  }, [discountDialog.data, discountDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (discountDialog.open) {
      initDialog();
    }
  }, [discountDialog.open, initDialog]);

  function closeComposeDialog() {
    discountDialog.type === 'edit'
      ? dispatch(Actions.closeEditDiscountDialog())
      : dispatch(Actions.closeDiscountDialog());
  }

  function canBeSubmitted() {
    return form.discount_name.length > 0;
  }

  function onSubmit(event) {
    event.preventDefault();

    if (discountDialog.type === 'new') {
      dispatch(Actions.createDiscount(form));
    } else {
      dispatch(Actions.updateDiscount(form));
    }
    closeComposeDialog();
  }

  console.log(form, "form")

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={discountDialog.open}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            {discountDialog.type === 'edit' ? 'Update Discount' : 'New Discount'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={onSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
              <Typography>Discount name</Typography>
            </div>

            <TextField
              className='mb-24'
              label='Discount name'
              autoFocus
              id='discount_name'
              name='discount_name'
              value={form.discount_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
              <Typography>Amount</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Amount'
              id='amount'
              name='amount'
              value={form.amount}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>
        </DialogContent>
        
        <DialogActions className='justify-between pl-16'>
          {discountDialog.type === 'edit' ? 
          (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={!canBeSubmitted()}
            >
              Update
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DiscountDialog;

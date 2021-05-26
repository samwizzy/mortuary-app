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
} from '@material-ui/core';
import { FuseChipSelect } from '@fuse';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const defaultFormState = {
  id: '',
  amount: "",
  discount_name: "",
  discount_type: "DEFAULT",
};

const discounts = ["DEFAULT"].map(type => ({
  label: type.toLowerCase(),
  value: type,
}));

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
        ...defaultFormState,
        ...discountDialog.data,
        id: FuseUtils.generateGUID(),
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
      ? dispatch(Actions.closeServiceDialog())
      : dispatch(Actions.closeServiceDialog());
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
            {discountDialog.type === 'edit' ? 'Update Discount' : ''}
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
              <Typography>Discount type</Typography>
            </div>
            <FuseChipSelect
              className='mt-8 mb-24'
              value={discounts.find(type => type.value === form.discount_type)}
              onChange={(value) => handleChipChange(value, 'discount_type')}
              placeholder='Select discount type'
              textFieldProps={{
                label: 'Discount Type',
                InputLabelProps: {
                  shrink: true,
                },
                variant: 'outlined',
              }}
              options={discounts}
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

        {discountDialog.type === 'edit' ? (
          <DialogActions className='justify-between pl-16'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={!canBeSubmitted()}
            >
              Update
            </Button>
          </DialogActions>
        ) : ( null )}
      </form>
    </Dialog>
  );
}

export default DiscountDialog;

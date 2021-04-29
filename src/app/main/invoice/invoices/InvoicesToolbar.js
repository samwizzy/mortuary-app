import React from 'react';
import { Button, Icon, IconButton, Popover, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import * as Actions from './../store/actions';

function InvoicesToolbar(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleSendInvoice = () => {
    dispatch(Actions.openNewInvoiceDialog());
    handleClose();
  };

  const handleRecordPayment = () => {
    dispatch(Actions.openNewInvoiceDialog());
    handleClose();
  };

  const invoice = {};

  if (!invoice) {
    return null;
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;

  return (
    <div className='flex flex-1 items-center justify-end overflow-hidden sm:px-16'>
      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>print</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>delete</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>mail</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <div className='ml-16'>
            <Button
              aria-describedby={id}
              variant='contained'
              size='small'
              disableElevation
              onClick={handleClick}
            >
              Send invoice
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={handleSendInvoice}>Send Invoice</MenuItem>
              <MenuItem onClick={handleRecordPayment}>Record Payment</MenuItem>
            </Popover>
          </div>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(InvoicesToolbar);

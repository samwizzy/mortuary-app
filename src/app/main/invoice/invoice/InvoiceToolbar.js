import React, {useState} from 'react';
import { Button, Icon, IconButton, Popover, MenuItem } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/index';

function InvoiceToolbar(props){
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const match = useRouteMatch()

  const invoice = useSelector(({invoicesApp}) => invoicesApp.invoices.invoice);

  console.log(invoice, "invoice details")

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleSendInvoice = () => {
    dispatch(Actions.openSendInvoiceDialog(invoice));
    handleClose();
  };

  const handleRecordPayment = () => {
    dispatch(Actions.initializeInvoicePayment(match.params.id));
    handleClose();
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={!invoice} onClick={handleSendInvoice}>
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
              Options <Icon>expand_more</Icon>
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
              <MenuItem disabled={!invoice} onClick={handleSendInvoice}>Send Invoice</MenuItem>
              <MenuItem disabled={!invoice} onClick={handleRecordPayment}>Record Payment</MenuItem>
            </Popover>
          </div>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(InvoiceToolbar);

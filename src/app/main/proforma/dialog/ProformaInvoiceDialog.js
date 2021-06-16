import React, { useEffect } from 'react';
import {FuseAnimate, FuseScrollbars} from "@fuse"
import {useHistory} from "react-router-dom"
import moment from "moment"
import {
  Icon, IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import ReactToPdf from "react-to-pdf"

function ProformaInvoiceDialog(props) {
  const dispatch = useDispatch();
  const history = useHistory()
  const ref = React.createRef()
  const invoiceDialog = useSelector(({ proformaApp }) => proformaApp.invoices.proformainvoiceDialog);
  const user = useSelector(({ auth }) => auth.user.data);

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9,14]
  };

  console.log(invoiceDialog, "invoiceDialog")

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (invoiceDialog.props.open) {
   
    }
  }, [invoiceDialog.props.open]);

  function closeComposeDialog() {
    dispatch(Actions.closeProformaInvoiceDialog())
    history.push("/proforma")
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...invoiceDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='md'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex justify-between'>
          <Typography variant='subtitle1' color='inherit'>
            Proforma Invoice Summary
          </Typography>
          <div className='flex items-center' aria-label='Toggle star'>
            <FuseAnimate animation='transition.expandIn' delay={100}>
              <IconButton color="inherit" onClick={() => {}}>
                <Icon>mail</Icon>
              </IconButton>
            </FuseAnimate>
            <FuseAnimate animation='transition.expandIn' delay={100}>
              <ReactToPdf targetRef={ref} filename="div-blue.pdf" options={options} x={.1} y={.1} scale={0.94}>
                {({toPdf}) => (
                  <IconButton color="inherit" disabled={!invoiceDialog.data} onClick={toPdf}>
                    <Icon className="text-white">print</Icon>
                  </IconButton>
                )}
              </ReactToPdf>
            </FuseAnimate>
          </div>
        </Toolbar>
      </AppBar>
    
      <DialogContent classes={{ root: 'p-24' }}>
        <FuseAnimate delay={100}>
          <div className='flex flex-wrap mt-0 mb-24' ref={ref}>
            <div className='w-10/12 mx-auto bg-white overflow-hidden sm:rounded-lg'>
              <div className='flex justify-between px-4 py-0 sm:px-6'>
                <h1>
                  <img
                    className='h-96'
                    src='/assets/images/profile/omega-homes.svg'
                    alt=''
                  />
                </h1>
                <div>
                  <dl className="space-y-16 text-right text-xs">
                    <div>
                      <dt className="capitalize">{user.organisation?.city} Location</dt>
                      <dt>{user.organisation?.companyName}</dt>
                      <dt>{user.organisation?.address}</dt>
                      <dt>{user.organisation?.city}, {user.organisation?.state}</dt>
                      <dt>{user.organisation?.country}</dt>
                      <dt>
                        <div className="space-x-8">
                        <span>{user.organisation?.phoneNumber}</span>
                        <span>{user.organisation?.contactPersonPhone}</span>
                        <span>{user.organisation?.contactPersonTel}</span>
                        </div>
                      </dt>
                      <dt>{user.organisation?.emailAddress}</dt>
                      <dt><hr className="my-16 border-0 border-t border-solid border-grey-light" /></dt>
                      <dt>A/C NAME: OMEGA FUNERAL HOMES</dt>
                      <dt>GTBank 0174644878</dt>
                      <dt>Polaris Bank 1771874077</dt>
                    </div>
                    <div className="text-gray-600">
                      <dt>{moment().format("dddd, MMMM Do, YYYY")}</dt>
                      <dt>{invoiceDialog?.data?.proforma_invoice_number}</dt>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="text-center">
                <h2 className="uppercase text-lg italic text-gray-900">Proforma Invoice</h2>
              </div>

              <div className='p-24 border border-solid border-grey-light'>
                <dl>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Family Name :
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {invoiceDialog?.data?.family_name}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Contact Person :
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {invoiceDialog?.data?.contact_person}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Address :
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {invoiceDialog?.data?.address}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Phone number :
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {invoiceDialog?.data?.phone_number}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Email :
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {invoiceDialog?.data?.email}
                    </dd>
                  </div>
                </dl>

                <FuseScrollbars className='flex-grow overflow-x-auto'>
                  <Table className='mt-24' aria-labelledby='tableTitle'>
                    <TableHead>
                      <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell>Product/Service</TableCell>
                        <TableCell>Rate</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {invoiceDialog?.data?.service                       
                        .map((s, i) => {
                          return (
                            <TableRow
                              className='h-64 cursor-pointer'
                              hover
                              role='checkbox'
                              tabIndex={-1}
                              key={s.id}
                            >
                              <TableCell component='th' scope='row'>
                                {i+1}
                              </TableCell>

                              <TableCell className='truncate' component='th' scope='row'>
                                {s.service?.serviceName}
                              </TableCell>

                              <TableCell component='th' scope='row'>
                                {s.rate}
                              </TableCell>

                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </FuseScrollbars>
                      
              </div>
            </div>
          </div>
        </FuseAnimate>
      </DialogContent>

      <DialogActions className='pr-24 justify-end'>
        <Button
          variant='contained'
          color='primary'
          onClick={closeComposeDialog}
          type='submit'
        >
          Close
        </Button>
      </DialogActions>
       
    </Dialog>
  );
}

export default ProformaInvoiceDialog;

import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { withRouter, useRouteMatch } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton, Icon
} from '@material-ui/core';
import { FuseScrollbars, FuseAnimate, FuseUtils } from '@fuse';
import _ from '@lodash';
import moment from "moment";
import InvoiceTableHead from './InvoiceTableHead';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import converter from "number-to-words";
import ReactToPdf from "react-to-pdf"

function InvoiceList(props){
  const { /*searchText,*/ invoice, user, services } = props
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const ref = React.createRef();

  const [selected, setSelected] = useState([]);
  const data = invoice? invoice.service : [];

  console.log(invoice, "invoice")
  console.log(user, "user")

  useEffect(() => {
    dispatch(Actions.getInvoiceById(match.params.id));
  }, [dispatch, match.params.id]);

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9,14]
  };

  return (
    <div className='flex flex-col'>
      <FuseAnimate delay={100}>
        <div className='flex flex-col flex-wrap mt-0 mb-24 relative'>
          <div className="absolute right-0 top-0 bg-orange-lighter">
            <ReactToPdf targetRef={ref} filename={`${invoice?.invoice_number}.pdf`} options={options} x={.4} y={.4} scale={0.92}>
              {({toPdf}) => (
                <IconButton disabled={!invoice} onClick={toPdf}>
                  <Icon>cloud_download</Icon>
                </IconButton>
              )}
            </ReactToPdf>
          </div>

          <div className='w-9/12 mx-auto bg-white overflow-hidden sm:rounded-lg' ref={ref}>
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
                    <dt><hr className="my-16 border-0 border-t border-grey-darkest" /></dt>
                    <dt>A/C NAME: OMEGA FUNERAL HOMES</dt>
                    <dt>GTBank 0174644878</dt>
                    <dt>Polaris Bank 1771874077</dt>
                  </div>
                  <div className="text-gray-600">
                    <dt>{moment(invoice?.invoice_date).format("dddd, MMMM Do, YYYY")}</dt>
                    <dt>{invoice?.invoice_number}</dt>
                  </div>
                </dl>
              </div>
              
            </div>

            <div className="text-center">
              <h1 className='text-xl leading-6 uppercase font-bold italic text-gray-900'>
                Payment Advice
              </h1>
              <dl>
                <div className="text-center">
                  <dt>Customer Name</dt>
                  <dt>{invoice?.customer?.firstName} {invoice?.customer?.lastName} ({invoice?.customer?.otherName})</dt>
                </div>
              </dl>
            </div>

            <div className='border-t border-gray-200'>
              <Table className='' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell className='text-sm font-medium'>Bill to</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className='h-64'>
                    <TableCell component='td' scope='row'>
                      <dl>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Invoice Number
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {invoice?.invoice_number}
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Invoice date
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {invoice?.invoice_date}
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Due date
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {invoice?.invoice_date}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                    <TableCell component='td' scope='row'>
                      <dl>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Name
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {invoice?.customer?.firstName} {invoice?.customer?.lastName}
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Address
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {invoice?.bill_to}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <FuseScrollbars className='flex-grow overflow-x-auto mt-16'>
                <Table className='' aria-labelledby='tableTitle'>
                  <InvoiceTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={data.length}
                  />
                  <TableBody>
                    {data
                      .map((n) => {
                        return (
                          <TableRow
                            className='h-64 cursor-pointer'
                            hover
                            tabIndex={-1}
                            key={n.id}
                          >
                            <TableCell component='th' scope='row'>
                              {_.find(services, {id: n.serviceId})?.service_name}
                            </TableCell>

                            <TableCell className='truncate' component='th' scope='row'>
                              {n.discountAmount}%
                            </TableCell>

                            <TableCell component='th' scope='row' align='left'>
                              {n.qty}
                            </TableCell>

                            <TableCell component='th' scope='row' align='left'>
                              {FuseUtils.formatCurrency(n.rate * n.qty)}
                            </TableCell>

                            <TableCell component='th' scope='row' align='right'>
                              {FuseUtils.formatCurrency(n.invoice?.totalAmount)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell className="bg-blue-lightest font-bold">Total</TableCell>
                        <TableCell className="bg-blue-lightest" align="right">{FuseUtils.formatCurrency(invoice?.amount_due)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell colSpan={2}>
                          <span className="text-xs">
                            ({invoice?.total_amount
                              ? converter.toWords(invoice?.total_amount) 
                              : 0
                            } naira only)
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell colSpan={2}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell colSpan={2} className="text-center bg-blue text-white">Deposits</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>S/N</TableCell>
                                <TableCell align="right">Amount</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell align="right">{FuseUtils.formatCurrency(0)}</TableCell>
                              </TableRow>
                              <TableRow className="bg-blue-lightest">
                                <TableCell className="font-bold">Deficit</TableCell>
                                <TableCell align="right">{FuseUtils.formatCurrency(invoice?.total_amount)}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </FuseScrollbars>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

const mapStateToProps = ({invoicesApp, auth}) => {
  const { invoices, services } = invoicesApp
  return {
    searchText: invoices.searchText,
    invoice: invoices.invoice,
    services: services.services.services,
    user: auth.user.data,
  }
}

export default withRouter(connect(mapStateToProps)(InvoiceList));
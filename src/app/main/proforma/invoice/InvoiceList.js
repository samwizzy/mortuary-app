import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { withRouter, useRouteMatch } from 'react-router-dom';
import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import moment from 'moment';
import InvoiceTableHead from './InvoiceTableHead';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import Pdf from "react-to-pdf"

function InvoiceList(props) {
  const { invoice, user } = props
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const printRef = React.createRef();

  const [selected, setSelected] = useState([]);
  const data = invoice? invoice.service : [];

  console.log(invoice, "proforma invoice by id")
  console.log(user, "auth user")

  useEffect(() => {
    dispatch(Actions.getProformaInvoiceById(match.params.id));
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
            <Pdf targetRef={printRef} filename={`${invoice?.proforma_invoice_number}.pdf`} options={options} x={.4} y={.4} scale={0.92}>
              {({ toPdf }) => 
                <IconButton onClick={toPdf}>
                  <Icon>cloud_download</Icon>
                </IconButton>
              }
            </Pdf>
          </div>

          <div className='w-9/12 mx-auto bg-white overflow-hidden sm:rounded-lg' ref={printRef}>
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
                    <dt><hr className="my-16 border-0 border-t border-grey-lightest" /></dt>
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
              <h2 className="uppercase text-lg italic text-gray-900">Proforma Invoice</h2>
            </div>

            <div className='p-24 border border-solid border-grey-light'>
              <dl>
                <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Family Name :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {invoice?.family_name}
                  </dd>
                </div>
                <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Contact Person :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {invoice?.contact_person}
                  </dd>
                </div>
                <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Address :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {invoice?.address}
                  </dd>
                </div>
                <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Phone :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {invoice?.phone_number}
                  </dd>
                </div>
                <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Email :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {invoice?.email}
                  </dd>
                </div>
              </dl>

              <FuseScrollbars className='flex-grow overflow-x-auto'>
                <Table className='mt-24' aria-labelledby='tableTitle'>
                  <InvoiceTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={data.length}
                  />

                  <TableBody>
                    {data
                      .map((n, i) => {
                        const isSelected = selected.indexOf(n.id) !== -1;
                        return (
                          <TableRow
                            className='h-64 cursor-pointer'
                            hover
                            role='checkbox'
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={i}
                            selected={isSelected}
                          >
                            <TableCell component='th' scope='row'>
                              {i+1}
                            </TableCell>

                            <TableCell className='truncate' component='th' scope='row'>
                              {n.service?.serviceName}
                            </TableCell>

                            <TableCell component='th' scope='row' align='right'>
                              {n.rate}
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

      
    </div>
  );
}

const mapStateToProps = ({proformaApp, auth}) => {
  const { invoices, services } = proformaApp
  return {
    searchText: invoices.searchText,
    invoice: invoices.proformaInvoice,
    services: services.services.services,
    user: auth.user.data,
  }
}

export default withRouter(connect(mapStateToProps)(InvoiceList));

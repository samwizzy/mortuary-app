import React, { useEffect } from 'react';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { useRouteMatch, Link } from "react-router-dom";
import * as Actions from "./../store/actions";
import moment from "moment";
import {
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  Card,
  CardHeader,
  CardMedia,
} from '@material-ui/core';
import { FuseAnimate, FuseUtils } from '@fuse';

const CustomerDetails = (props) => {
  const { getCustomerById, payForInvoice } = props
  const customerReducer = useSelector(({customerApp}) => customerApp.customer);
  const customer = customerReducer.customer
  const match = useRouteMatch();

  console.log(customer, "customer")

  useEffect(() => {
    getCustomerById(match.params.id)
  }, [getCustomerById, match.params.id]);

  return (
    <div className=''>
      <div className='bg-white overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-0 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Applicant Information
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Personal details and application.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className='border-t border-gray-200 mb-24'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Full name</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.first_name}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Other name
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.other_name}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Last name
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.last_name}
                </dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Email address
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.email}
                </dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Phone Number
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.phone_number}
                </dd>
              </div>
              
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Address</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.address}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Relationship with Deceased
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.relationship_with_deceased}
                </dd>
              </div>
            </dl>
          </div>
          <div className='border-t border-gray-200 mb-24'>
            <Card className="w-192 border border-grey-light border-solid text-center mb-16" elevation={0}>
              <CardMedia image={customer?.customer_image} className="w-full h-192" />
             
              <CardHeader className="text-center" title="Customer Image" titleTypographyProps={{variant: "subtitle2"}} />
            </Card>
            <Card className="w-192 border border-grey-light border-solid text-center" elevation={0}>
              <CardMedia image={customer?.signature} className="w-full h-192" />
              <CardHeader className="text-center" title="Signature" titleTypographyProps={{variant: "subtitle2"}} />
            </Card>
          </div>
        </div>

        <div className='mb-24 px-4 py-5 sm:px-6'>
          <FuseAnimate>
            <Typography
              variant='subtitle1'
              className='text-lg leading-6 font-medium text-gray-900'
            >
              Deceased
            </Typography>
          </FuseAnimate>

          <Table className='simple mt-16'>
            <TableHead>
              <TableRow>
                <TableCell>Deceased Name</TableCell>
                <TableCell>Reference ID</TableCell>
                <TableCell align='right'>Age</TableCell>
                <TableCell align='right'>Place of Death</TableCell>
                <TableCell align='right'>Date of Death</TableCell>
                <TableCell align='right'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer?.deceased.map(dsc => 
              <TableRow key={dsc.id}>
                <TableCell><Link to={`/deceased/${dsc.id}`}>{dsc.first_name}</Link></TableCell>
                <TableCell>00000789</TableCell>
                <TableCell align='right'>{dsc.age}</TableCell>
                <TableCell align='right'>{dsc.place_of_death}</TableCell>
                <TableCell align='right'>{moment(dsc.dateof_assertion).format("Do MMMM, YYYY")}</TableCell>
                <TableCell align='right'>{dsc.status > 0 ? "True" : "False"}</TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className='mb-24 px-4 py-5 sm:px-6'>
          <FuseAnimate>
            <Typography
              variant='subtitle1'
              className='text-lg leading-6 font-medium text-gray-900'
            >
              Invoice Summary
            </Typography>
          </FuseAnimate>

          <Table className='simple mt-16'>
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>No. of Products/Services</TableCell>
                <TableCell align='right'>Invoice Date</TableCell>
                <TableCell align='right'>Bill To</TableCell>
                <TableCell align='right'>Total Amount</TableCell>
                <TableCell align='right'>Amount Due</TableCell>
                <TableCell align='right' />
              </TableRow>
            </TableHead>
            <TableBody>
            {customer?.invoice.map(inv => 
              <TableRow key={inv.id}>
                <TableCell><Link to={`/invoices/${inv.id}`}>{inv.invoice_number}</Link></TableCell>
                <TableCell>0</TableCell>
                <TableCell align='right'>{moment(inv.invoice_date).format("Do MMMM, YYYY")}</TableCell>
                <TableCell align='right'>{inv.customer?.firstName}</TableCell>
                <TableCell align='right'>{FuseUtils.formatCurrency(inv.total_amount)}</TableCell>
                <TableCell align='right'>{FuseUtils.formatCurrency(inv.amount_due)}</TableCell>
                <TableCell align='right'>
                  <Button color="primary" variant="contained" onClick={() => payForInvoice(inv.id)}>Pay</Button>
                </TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCustomerById: Actions.getCustomerById,
    payForInvoice: Actions.payForInvoice,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CustomerDetails);

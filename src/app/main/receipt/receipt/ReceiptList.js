import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
// import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';

function DeceasedList(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(Actions.getProducts());
  }, [dispatch]);

  return (
    <div className='flex flex-col'>
      <FuseAnimate delay={100}>
        <div className='flex flex-wrap mt-8 mb-24'>
          <div className='bg-white overflow-hidden sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h1>
                <img
                  className='h-72'
                  src='/assets/images/profile/omega-homes.svg'
                  alt=''
                />
              </h1>
              <h3 className='text-xl leading-6 font-bold text-gray-900'>
                Receipt
              </h3>
              <dl>
                <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Receipt Number
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    INV/2093746382
                  </dd>
                </div>
              </dl>
            </div>
            <div className='border-t border-gray-200'>
              <Table className='min-w-xl' size='small'>
                <TableBody>
                  <TableRow className='h-64'>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Bill to:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            Ike Eze
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Payment date:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            5th April 2021
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Payment Method:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            Bank Transfer
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <div className='flex flex-col space-y-2 bg-blue px-16 py-24 rounded-md text-white text-center'>
                        <span className='text-lg'>Payment Amount</span>
                        <span className='text-6xl font-black'>N 50,000</span>
                        <span className='text-lg font-bold'>
                          ( Fifty Thousand Naira only )
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </FuseAnimate>

      <FuseScrollbars className='flex-grow overflow-x-auto mb-24'>
        <Table className='min-w-xl' size='small'>
          <TableBody>
            <TableRow className='h-64'>
              <TableCell component='th' scope='row'>
                <dl>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-900'>
                      Invoice Number:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      INV/193836350
                    </dd>
                  </div>
                </dl>
              </TableCell>
              <TableCell component='th' scope='row'>
                <dl>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-900'>
                      Invoice Amount:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      N 450,000
                    </dd>
                  </div>
                </dl>
              </TableCell>
            </TableRow>
            <TableRow className='h-64'>
              <TableCell component='th' scope='row'>
                <dl>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-900'>
                      Invoice Date:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      23rd April, 2021
                    </dd>
                  </div>
                </dl>
              </TableCell>
              <TableCell component='th' scope='row'>
                <dl>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-900'>
                      Payment Amount:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      N 450,000
                    </dd>
                  </div>
                </dl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
}

export default withRouter(DeceasedList);

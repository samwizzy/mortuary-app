import React from 'react';
import { useSelector } from "react-redux"
import moment from "moment"

function RegistrationsList(props) {
  const customerReducer = useSelector(({dashboardApp}) => dashboardApp.customer.customers)
  const customers = customerReducer.customers

  console.log(customers, "registered customers")

  return (
    <div className='flex flex-col mt-16'>
      <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
        <h2 className='px-20 py-8'>Recent Registrations</h2>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-20 py-8 text-left font-medium text-gray-500 uppercase tracking-wider'
              >
                Name
              </th>
              <th
                scope='col'
                className='px-20 py-8 text-left font-medium text-gray-500 uppercase tracking-wider'
              >
                Date registered
              </th>
              <th
                scope='col'
                className='px-20 py-8 text-left font-medium text-gray-500 uppercase tracking-wider'
              >
                Email Address
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {customers.map((emp, i) => (
              <tr key={i}>
                <td className='px-16 py-8 whitespace-nowrap'>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-gray-800'>
                      {emp.first_name} {emp.last_name}
                    </div>
                  </div>
                </td>
                <td className='px-20 py-8 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {moment().format("Do MMMM YYYY")}
                  </div>
                </td>
                <td className='px-20 py-8 whitespace-nowrap text-sm text-gray-500'>
                  {emp.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegistrationsList;

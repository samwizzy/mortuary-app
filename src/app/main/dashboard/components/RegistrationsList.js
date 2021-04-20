import React from 'react';

const employees = [
  {
    name: 'Jacob Ademola',
    dateRegistered: '30th March 2019',
    email: 'jacobademola@gmail.com',
  },
  {
    name: 'Jacob Ademola',
    dateRegistered: '30th March 2019',
    email: 'jacobademola@gmail.com',
  },
  {
    name: 'Jacob Ademola',
    dateRegistered: '30th March 2019',
    email: 'jacobademola@gmail.com',
  },
];

function RegistrationsList(props) {
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
            {employees.map((emp, i) => (
              <tr key={i}>
                <td className='px-16 py-8 whitespace-nowrap'>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-gray-800'>
                      {emp.name}
                    </div>
                  </div>
                </td>
                <td className='px-16 py-8 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {emp.dateRegistered}
                  </div>
                </td>
                <td className='px-16 py-8 whitespace-nowrap text-sm text-gray-500'>
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

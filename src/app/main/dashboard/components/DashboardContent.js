import React from 'react';
import { Widget1, Widget2, Widget3 } from './widgets';
import RegistrationsList from './RegistrationsList';

function DashboardContent(props) {
  return (
    <div className='w-full'>
      <div className='flex justify-between space-x-16'>
        <Widget1 />
        <Widget2 />
        <Widget3 />
      </div>

      <RegistrationsList />
    </div>
  );
}

export default DashboardContent;

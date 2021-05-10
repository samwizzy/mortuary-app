import React from 'react';
import { Widget1, Widget2, Widget3 } from './widgets';
import RegistrationsList from './RegistrationsList';

function DashboardContent(props) {
  return (
    <div className='w-full'>
      <div className='flex md:flex-row flex-col justify-between md:space-x-16 space-y-16 md:space-y-0'>
        <Widget1 />
        <Widget2 />
        <Widget3 />
      </div>

      <RegistrationsList />
    </div>
  );
}

export default DashboardContent;

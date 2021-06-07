import React, { useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { FuseAnimate } from '@fuse';
import * as Actions from "./../store/actions"

function DeceasedDetails(props) {
  const { getDeceasedById } = props
  const match = useRouteMatch();
  const deceasedReducer = useSelector(({deceasedApp}) => deceasedApp.deceased);
  const deceased = deceasedReducer.deceased
  console.log(deceased, "deceasedDetail")

  useEffect(() => {
    getDeceasedById(match.params.id)
  }, [getDeceasedById, match.params.id]);

  if(!deceased){
    return null
  }

  return (
    <div>
      <div className='flex items-center justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <FuseAnimate delay={100}>
            <div className='flex flex-wrap mt-8'>
              <div className='w-full bg-white shadow overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Basic Information
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Deceased details
                  </p>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        First name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.first_name}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Last Name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {deceased.last_name}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Other name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.other_name}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Gender
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.gender}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>Age</dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.age}
                      </dd>
                    </div>

                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Address
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.address}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className='w-full bg-white shadow overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Date of Assertion
                  </h3>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Place of death
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.place_of_death}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Date of Assertion
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.dateof_assertion}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Cause of death
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.cause_of_death}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Time
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.time_of_death}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        How was death ascertained?
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.how_was_death_assertained}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className='w-full bg-white shadow overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Medical
                  </h3>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Name of Hosipital
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.name_of_hospital}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Medical Attendant
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.medical_attendant_name}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Address
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {deceased.hospital_address}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </FuseAnimate>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getDeceasedById: Actions.getDeceasedById
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(DeceasedDetails);

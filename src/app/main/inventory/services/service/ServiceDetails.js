import React, {useEffect} from 'react';
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { FuseAnimate } from '@fuse';
import * as Actions from "../../store/actions"
import { types } from "./../Services"

function ServiceDetails(props) {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const servicesReducer = useSelector(({inventoryApp}) => inventoryApp.services)
  const service = servicesReducer.service

  useEffect(() => {
    dispatch(Actions.getServiceById(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <div>
      <div className='flex items-center justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <FuseAnimate delay={100}>
            <div className='flex flex-wrap mt-8'>
              <div className='w-full bg-white overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Service Details
                  </h3>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Service name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.service_name}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Service type
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {_.find(types, {id: Number(service?.service_type)})?.label}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Created by
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.created_by}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Admission
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.is_admisson? "Available" : "Unavailable"}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>is_customer_image</dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.is_customer_image? "Available" : "Unavailable"}
                      </dd>
                    </div>

                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Can Request customer signature?
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.request_customer_signature? "Available" : "Unavailable"}
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

export default ServiceDetails;

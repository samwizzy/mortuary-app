import React from 'react';
import _ from "lodash";
import { FuseScrollbars } from '@fuse';
import { useSelector } from "react-redux"
import { withRouter } from 'react-router-dom';
import Dropzone from './Dropzone';

_.mixin({
  'findByValues': function(collection, property, values) {
    return _.filter(collection, function(item) {
      return _.includes(values, item[property]);
    });
  }
});

function CustomerImages(props) {
  const { form, handleImageUpload } = props;
  const serviceReducer = useSelector(({customerApp}) => customerApp.services);

  const services = serviceReducer.services.services;
  
  const formServices = form.service.map(s => s.service_id);

  console.log(formServices, "services customer images")

  const serviceBool =_.findByValues(services, "id", formServices)
  console.log(_.some(serviceBool, {is_admisson: true}), "boolena")

  return (
    <div className=' md:w-4/12 max-w-4xl mx-auto'>
      <div className='flex flex-col'>
        <FuseScrollbars className='flex-grow overflow-x-auto'>
          <Dropzone
            disabled={_.some(serviceBool, {is_customer_image: true})}
            name='customer_image'
            title='customer_image'
            form={form}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/picture.svg'
            format="image"
          />
          <Dropzone
            disabled={_.some(serviceBool, {request_customer_signature: true})}
            name='signature'
            title='signature'
            form={form}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/upload.svg'
            format="image"
          />
        </FuseScrollbars>
      </div>
    </div>
  );
}

export default withRouter(CustomerImages);

import React from 'react';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import Dropzone from './Dropzone';

function CustomerImages(props) {
  const { form, handleImageUpload } = props;

  return (
    <div className=' md:w-4/12 max-w-4xl mx-auto'>
      <div className='flex flex-col'>
        <FuseScrollbars className='flex-grow overflow-x-auto'>
          <Dropzone
            name='customer_image'
            title='customer_image'
            form={form}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/picture.svg'
          />
          <Dropzone
            name='signature'
            title='signature'
            form={form}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/upload.svg'
          />
        </FuseScrollbars>
      </div>
    </div>
  );
}

export default withRouter(CustomerImages);

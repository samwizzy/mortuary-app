import React from 'react';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import Dropzone from './Dropzone';

function DeceasedImages(props) {
  const { form, handleChange } = props;

  return (
    <div className=' md:w-4/12 max-w-4xl mx-auto'>
      <div className='flex flex-col'>
        <FuseScrollbars className='flex-grow overflow-x-auto'>
          <Dropzone
            name='deceased.image'
            form={form}
            handleChange={handleChange}
            icon='/assets/images/icons/picture.svg'
          />
          <Dropzone
            name='deceased.hospitalRecord'
            form={form}
            handleChange={handleChange}
            icon='/assets/images/icons/upload.svg'
          />
          <Dropzone
            name='deceased.supportingDoc'
            form={form}
            handleChange={handleChange}
            icon='/assets/images/icons/upload.svg'
          />
        </FuseScrollbars>
      </div>
    </div>
  );
}

export default withRouter(DeceasedImages);

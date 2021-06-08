import React from 'react';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import Dropzone from './Dropzone';

function DeceasedImages(props) {
  const { form, handleImageUpload } = props;

  return (
    <div className=' md:w-4/12 max-w-4xl mx-auto'>
      <div className='flex flex-col'>
        <FuseScrollbars className='flex-grow overflow-x-auto'>
          <Dropzone
            name='deceased.deceased_image'
            title="deceased_image"
            form={form}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/picture.svg'
            format="image"
            disabled="false"
          />
          <Dropzone
            name='deceased.record_of_death_from_hospital'
            title="record_of_death_from_hospital"
            form={form}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/upload.svg'
            format="pdf"
            disabled="false"
          />
          <Dropzone
            name='deceased.supporting_document'
            title="supporting_document"
            form={form}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/upload.svg'
            format="pdf"
            disabled="false"
          />
        </FuseScrollbars>
      </div>
    </div>
  );
}

export default withRouter(DeceasedImages);

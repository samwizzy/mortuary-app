import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { FusePageSimple } from '@fuse';
import CustomersList from './CustomersList';

const styles = (theme) => ({
  layoutRoot: {},
});

class CustomerDetails extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <div className='px-24'>
            <h4 className='text-lg'>Customer Details</h4>
          </div>
        }
        content={
          <div className='p-24'>
            <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
              <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Applicant Information
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  Personal details and application.
                </p>
              </div>
              <div className='border-t border-gray-200'>
                <dl>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Full name
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      Margot Foster
                    </dd>
                  </div>
                  <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Application for
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      Backend Developer
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Email address
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      margotfoster@example.com
                    </dd>
                  </div>
                  <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Salary expectation
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      $120,000
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>About</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      Description
                    </dd>
                  </div>
                  <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Attachments
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'></dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomerDetails);

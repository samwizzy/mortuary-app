import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
import { FusePageSimple } from '@fuse';
import CustomersList from './CustomersList';

const styles = (theme) => ({
  layoutRoot: {},
});

class CustomerApp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <div className='px-24'>
            <h4 className='text-lg'>Customers</h4>
          </div>
        }
        content={
          <div className='p-24'>
            <CustomersList />
          </div>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomerApp);

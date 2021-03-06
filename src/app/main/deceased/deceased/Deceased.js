import React from 'react';
import { FusePageSimple } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import DeceasedList from './DeceasedList';
import DeceasedHeader from './DeceasedHeader';

const styles = (theme) => ({
  layoutRoot: {},
});

function Deceased(props) {
  const { classes } = props;

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className='px-24'>
          <DeceasedHeader />
        </div>
      }
      content={<DeceasedList />}
    />
  );
}

export default withReducer('deceasedApp', reducer)(withStyles(styles, { withTheme: true })(Deceased));

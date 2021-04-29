import React from 'react';
import { FusePageCarded } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
// import reducer from '../store/reducers';
import ServicesList from './ServicesList';
import ServiceDetails from './ServiceDetails';
import ServicesHeader from './ServicesHeader';
import ServicesToolbar from './ServicesToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

function Services(props) {
  const { classes } = props;

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ServicesHeader />}
      contentToolbar={
        props.match.params.id ? <ServicesToolbar /> : <ServicesToolbar />
      }
      content={
        <div className='p-24'>
          {props.match.params.id ? <ServiceDetails /> : <ServicesList />}
        </div>
      }
      innerScroll
    />
  );
}

// export default withReducer('eCommerceApp', reducer)(Deceased);
export default withStyles(styles, { withTheme: true })(Services);

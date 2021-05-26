import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { FusePageCarded } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import ServicesList from './ServicesList';
import ServiceDetails from './ServiceDetails';
import ServicesHeader from './ServicesHeader';
import ServicesToolbar from './ServicesToolbar';
import AddService from './AddService';

const styles = (theme) => ({
  layoutRoot: {},
});

function Services(props) {
  const { classes, match } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getServices())
  }, [dispatch])

  if(match.params.id === "new"){
    return <AddService />
  }

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
        <div className='p-24 w-full'>
          {props.match.params.id ? <ServiceDetails /> : <ServicesList />}
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(Services)));

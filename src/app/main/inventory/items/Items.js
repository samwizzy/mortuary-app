import React from 'react';
import { FusePageCarded } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
// import reducer from '../store/reducers';
import ItemsList from './ItemsList';
import ItemDetails from './ItemDetails';
import ItemsHeader from './ItemsHeader';
import ItemsToolbar from './ItemsToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

function Items(props) {
  const { classes } = props;

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ItemsHeader />}
      contentToolbar={
        props.match.params.id ? <ItemsToolbar /> : <ItemsToolbar />
      }
      content={
        <div className='p-24'>
          {props.match.params.id ? <ItemDetails /> : <ItemsList />}
        </div>
      }
      innerScroll
    />
  );
}

// export default withReducer('eCommerceApp', reducer)(Deceased);
export default withStyles(styles, { withTheme: true })(Items);

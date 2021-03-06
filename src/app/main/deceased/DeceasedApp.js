import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from "./store/reducers";
import { FusePageCarded } from '@fuse';
import DeceasedHeader from './deceased/DeceasedHeader';
import DetailsHeader from './details/DeceasedHeader';
import DeceasedList from './deceased/DeceasedList';
import DeceasedDetails from './details/DeceasedDetails';
import DetailsToolbar from './details/DeceasedToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

class DeceasedApp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={this.props.match.params.id ? <DetailsHeader /> : <DeceasedHeader />}
        contentToolbar={
          this.props.match.params.id ? <DetailsToolbar /> : null
        }
        content={
          <div className='w-full'>
            {this.props.match.params.id ? (
              <DeceasedDetails />
            ) : (
              <DeceasedList />
            )}
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withReducer("deceasedApp", reducer)(withStyles(styles, { withTheme: true })(DeceasedApp));

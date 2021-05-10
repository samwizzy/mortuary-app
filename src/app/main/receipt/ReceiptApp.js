import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import ReceiptHeader from './receipt/ReceiptHeader';
import ReceiptsList from './receipts/ReceiptsList';
import ReceiptList from './receipt/ReceiptList';
import ReceiptToolbar from './receipt/ReceiptToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

class ReceiptApp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<ReceiptHeader />}
        contentToolbar={
          this.props.match.params.id ? <ReceiptToolbar /> : <ReceiptToolbar />
        }
        content={
          <div className='w-full p-24'>
            {this.props.match.params.id ? <ReceiptList /> : <ReceiptsList />}
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ReceiptApp);

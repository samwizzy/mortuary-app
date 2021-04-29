import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducers from './store/reducers';
import { FusePageCarded } from '@fuse';
import InvoicesHeader from './invoices/InvoicesHeader';
import InvoiceHeader from './invoice/InvoiceHeader';
import InvoiceList from './invoices/InvoicesList';
import InvoiceDetails from './invoice/InvoiceDetails';
import InvoicesToolbar from './invoices/InvoicesToolbar';
import InvoiceToolbar from './invoice/InvoiceToolbar';
import InvoiceDialog from './dialog/InvoiceDialog';

const styles = (theme) => ({
  layoutRoot: {},
});

class InvoiceApp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <FusePageCarded
          classes={{
            root: classes.layoutRoot,
            content: 'flex',
            header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          }}
          header={
            this.props.match.params.id ? <InvoiceHeader /> : <InvoicesHeader />
          }
          contentToolbar={
            this.props.match.params.id ? (
              <InvoiceToolbar />
            ) : (
              <InvoicesToolbar />
            )
          }
          content={
            <div className='w-full p-24'>
              {this.props.match.params.id ? (
                <InvoiceDetails />
              ) : (
                <InvoiceList />
              )}
            </div>
          }
          innerScroll
        />
        <InvoiceDialog />
      </React.Fragment>
    );
  }
}

export default withReducer(
  'invoicesApp',
  reducers
)(withStyles(styles, { withTheme: true })(InvoiceApp));

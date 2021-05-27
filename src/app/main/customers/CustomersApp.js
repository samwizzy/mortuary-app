import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from "./store/reducers";
import * as Actions from "./store/actions";
import { FusePageCarded } from '@fuse';
import CustomersHeader from './customers/CustomersHeader';
import CustomerHeader from './customer/CustomerHeader';
import CustomerToolbar from './customer/CustomerToolbar';
import CustomersList from './customers/CustomersList';
import CustomerDetails from './customer/CustomerDetails';
import CreateCustomer from './new-customer/CreateCustomer';

const styles = (theme) => ({
  layoutRoot: {},
});

class CustomerApp extends Component {

  componentDidMount() {
    this.props.getCustomers()
  }

  render() {
    const { match } = this.props;

    if (match.params.id === 'new') {
      return <CreateCustomer />;
    }

    return (
      <FusePageCarded
        classes={{
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={match.params.id ? <CustomerHeader /> : <CustomersHeader />}
        contentToolbar={match.params.id ? <CustomerToolbar /> : null}
        content={
          <div className='p-16 sm:p-24 w-full'>
            {match.params.id ? <CustomerDetails /> : <CustomersList />}
          </div>
        }
        innerScroll
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCustomers: Actions.getCustomers
  }, dispatch)
}

export default withReducer("customerApp", reducer)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(CustomerApp)));

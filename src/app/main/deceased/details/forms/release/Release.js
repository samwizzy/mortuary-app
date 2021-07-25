import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import reducer from '../../../store/reducers';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import AdmissionHeader from "./ReleaseHeader"
import AdmissionToolbar from "./ReleaseToolbar"
import AdmissionForm from "./ReleaseForm"

const styles = (theme) => ({
  layoutRoot: {},
});

function Release(props){
  const { classes } = props

  return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot,
			}}
			header={
				<AdmissionHeader />
			}
			contentToolbar={
				<AdmissionToolbar />
			}
			content={
				<div className='p-24'>
					<AdmissionForm />
				</div>
			}
		/>
  );
}

const mapStateToProps = ({deceasedApp, auth}) => {
  const { deceased } = deceasedApp
  return {
    searchText: deceased.searchText,
    user: auth.user.data,
  }
}

export default withReducer("deceasedApp", reducer)(withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Release))));
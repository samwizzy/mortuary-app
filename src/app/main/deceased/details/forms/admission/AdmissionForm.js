import React from 'react';
// import { useDispatch } from "react-redux"
import { withRouter, useRouteMatch } from 'react-router-dom';
import {
	MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
	TextField,
  IconButton, Icon
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import moment from "moment";
// import * as Actions from '../../../store/actions';
import reducer from '../../../store/reducers';
import { connect } from 'react-redux';
import ReactToPdf from "react-to-pdf"
import withReducer from 'app/store/withReducer';

function AdmissionForm(props){
  const { user } = props
  // const dispatch = useDispatch();
  const match = useRouteMatch();
  const ref = React.createRef();

	console.log(match, "match")

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9,14]
  };

  return (
		<div className='flex flex-col bg-white p-24'>
			<FuseAnimate delay={100}>
				<div className='flex flex-col flex-wrap mt-0 mb-24 relative'>
					<div className="absolute right-0 top-0 bg-orange-lighter">
						<ReactToPdf targetRef={ref} filename={`example.pdf`} options={options} x={.4} y={.4} scale={0.92}>
							{({toPdf}) => (
								<IconButton disabled={!null} onClick={toPdf}>
									<Icon>cloud_download</Icon>
								</IconButton>
							)}
						</ReactToPdf>
					</div>

					<div className='w-9/12 mx-auto overflow-hidden sm:rounded-lg' ref={ref}>
						<div className='flex justify-between px-4 py-0 sm:px-6'>
							<h1>
								<img
									className='h-96'
									src='/assets/images/profile/omega-homes.svg'
									alt=''
								/>

							</h1>
							
							<div>
								<dl className="space-y-16 text-right text-xs">
									<div>
										<dt className="capitalize">{user.organisation?.city} Location</dt>
										<dt>{user.organisation?.companyName}</dt>
										<dt>{user.organisation?.address}</dt>
										<dt>{user.organisation?.city}, {user.organisation?.state}</dt>
										<dt>{user.organisation?.country}</dt>
										<dt>
											<div className="space-x-8">
											<span>{user.organisation?.phoneNumber}</span>
											<span>{user.organisation?.contactPersonPhone}</span>
											<span>{user.organisation?.contactPersonTel}</span>
											</div>
										</dt>
										<dt>{user.organisation?.emailAddress}</dt>
										<dt><hr className="my-16 border-0 border-t border-grey-darkest" /></dt>
										<div className="text-red font-bold">
											<dt>A/C NAME: OMEGA FUNERAL HOMES</dt>
											<dt>GTBank 0174644878</dt>
											<dt>Polaris Bank 1771874077</dt>
										</div>
									</div>
									<div className="text-gray-600">
										<dt>{moment().format("dddd, MMMM Do, YYYY")}</dt>
									</div>
								</dl>
							</div>
						</div>

						<div className="text-center">
							<p className="text-xs text-gray-600">DSOHQ00001850</p>
							<h1 className='text-xl leading-6 uppercase font-bold italic text-gray-900'>
								Corpse Admission Form
							</h1>
						</div>

						<div className='border-t border-gray-200'>
							<p>
								The undersigned represents to OMEGA FUNERAL HOME that he/she is the surviving spouse, next of kin,<br/>
								the legal representative and/or authorized family representative of the Deceased</p>
							<dl>
								<div className='bg-gray-50 px-1 py-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
									<dt className='text-sm font-bold text-gray-600 mt-2'>
										Name of deceased
									</dt>
									<dd className='text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										<TextField name="name" fullWidth />
									</dd>
								</div>
								<div className='bg-gray-50 px-1 py-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
									<dt className='text-sm font-bold text-gray-600 mt-2'>
										Address of deceased
									</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										<TextField name="address" fullWidth />
									</dd>
								</div>
								<div className='bg-gray-50 px-1 py-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
									<dt className='text-sm font-bold text-gray-600 mt-2'>
										Age of deceased
									</dt>
									<dd className='mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										<TextField name="age" />
										<div className='bg-gray-50 px-1 py-1 flex items-end sm:gap-4 sm:px-0'>
											<span className='text-sm font-bold text-gray-600'>
												Sex
											</span>
											<TextField 
												select
												className="min-w-128"
												name="sex" 
												fullWidth 
											>
												<MenuItem value="">Select sex</MenuItem>
												{['Male', "Female"].map(sex => 
													<MenuItem key={sex} value={sex}>{sex}</MenuItem>
												)}
											</TextField>	
										</div>
									</dd>
								</div>
							</dl>

							<div>
								<p className="text-xs">and as such has the paramount right to direct the disposition of the body of the deceased.</p>
								<p className="text-xs">The undersigned authorizes and directs the OMEGA FUNERAL HOME, its employees, independent contractors and agents (including apprentices and/or mortuary students) to take possession of the body of the deceased and transfer it to the Omega Funeral Home facility or any other facility equipped for appropriate storage.</p>
							</div>

							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Name & Relationship</TableCell>
										<TableCell>Address</TableCell>
										<TableCell>Signature</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>MRS KEHINDE A. ODUBANJO ( Daughter )</TableCell>
										<TableCell>5 JIBEWA SOMORIN CLOSE SAABO, OJODU BERGER</TableCell>
										<TableCell><img src="/assets/images/icons/paper.svg" alt="" className="h-64" /></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
  );
}

const mapStateToProps = ({deceasedApp, auth}) => {
  const { deceased } = deceasedApp
  return {
    searchText: deceased.searchText,
    user: auth.user.data,
  }
}

export default withReducer("deceasedApp", reducer)(withRouter(connect(mapStateToProps)(AdmissionForm)));
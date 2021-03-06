import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useRouteMatch } from 'react-router-dom';
import {
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  IconButton,
  Icon,
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import moment from 'moment';
import * as Actions from '../../../store/actions';
import reducer from '../../../store/reducers';
import { connect } from 'react-redux';
import ReactToPdf from 'react-to-pdf';
import withReducer from 'app/store/withReducer';

const defaultFormState = {
  address: '',
  age: '',
  cause_of_death: '',
  created_at: null,
  customer: null,
  dateof_assertion: null,
  deceasedInvoiceStatus: null,
  deceased_image: '',
  first_name: '',
  gender: '',
  hospital_address: '',
  how_was_death_assertained: '',
  id: '',
  last_name: '',
  medical_attendant_name: '',
  name_of_hospital: '',
  org_key: '',
  other_name: '',
  place_of_death: '',
  record_of_death_from_hospital: '',
  service: [],
  status: '1',
  supporting_document: '',
  time: null,
};

function AdmissionForm(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const deceased = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.deceased
  );
  const [form, setForm] = useState(defaultFormState);
  const match = useRouteMatch();
  const ref = React.createRef();

  useEffect(() => {
    dispatch(Actions.getDeceasedById(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (deceased) {
      setForm({
        ...defaultFormState,
        ...deceased,
      });
    }
  }, [deceased]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  console.log(match, 'match');
  console.log(deceased, 'deceased');
  console.log(user, 'user');

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9, 14],
  };

  return (
    <div className='flex flex-col bg-white p-24'>
      <FuseAnimate delay={100}>
        <div className='flex flex-col flex-wrap mt-0 mb-24 relative'>
          <div className='absolute right-0 top-0 bg-orange-lighter'>
            <ReactToPdf
              targetRef={ref}
              filename={`example.pdf`}
              options={options}
              x={0.4}
              y={0.4}
              scale={0.92}
            >
              {({ toPdf }) => (
                <IconButton disabled={!null} onClick={toPdf}>
                  <Icon>cloud_download</Icon>
                </IconButton>
              )}
            </ReactToPdf>
          </div>

          <div
            className='w-9/12 mx-auto overflow-hidden sm:rounded-lg'
            ref={ref}
          >
            <div className='flex justify-between px-4 py-0 sm:px-6'>
              <h1>
                <img
                  className='h-96'
                  src='/assets/images/profile/omega-homes.svg'
                  alt=''
                />
              </h1>

              <div>
                <dl className='space-y-16 text-right text-xs'>
                  <div>
                    <dt className='capitalize'>
                      {user.organisation?.city} Location
                    </dt>
                    <dt>{user.organisation?.companyName}</dt>
                    <dt>{user.organisation?.address}</dt>
                    <dt>
                      {user.organisation?.city}, {user.organisation?.state}
                    </dt>
                    <dt>{user.organisation?.country}</dt>
                    <dt>
                      <div className='space-x-8'>
                        <span>{user.organisation?.phoneNumber}</span>
                        <span>{user.organisation?.contactPersonPhone}</span>
                        <span>{user.organisation?.contactPersonTel}</span>
                      </div>
                    </dt>
                    <dt>{user.organisation?.emailAddress}</dt>
                    <dt>
                      <hr className='my-16 border-0 border-t border-grey-darkest' />
                    </dt>
                    <div className='text-red font-bold'>
                      <dt>A/C NAME: OMEGA FUNERAL HOMES</dt>
                      <dt>GTBank 0174644878</dt>
                      <dt>Polaris Bank 1771874077</dt>
                    </div>
                  </div>
                  <div className='text-gray-600'>
                    <dt>{moment().format('dddd, MMMM Do, YYYY')}</dt>
                  </div>
                </dl>
              </div>
            </div>

            <div className='text-center'>
              <p className='text-xs text-gray-600'>DSOHQ00001850</p>
              <h1 className='text-xl leading-6 uppercase font-bold italic text-gray-900'>
                Corpse Admission Form
              </h1>
            </div>

            <div className='border-t border-gray-200'>
              <p>
                The undersigned represents to OMEGA FUNERAL HOME that he/she is
                the surviving spouse, next of kin,
                <br />
                the legal representative and/or authorized family representative
                of the Deceased
              </p>
              <dl>
                <div className='bg-gray-50 px-1 py-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600 mt-2'>
                    Name of deceased
                  </dt>
                  <dd className='text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    <TextField
                      name='name'
                      value={`${form.first_name} ${form.last_name}`}
                      fullWidth
                    />
                  </dd>
                </div>
                <div className='bg-gray-50 px-1 py-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600 mt-2'>
                    Address of deceased
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    <TextField name='address' value={form.address} fullWidth />
                  </dd>
                </div>
                <div className='bg-gray-50 px-1 py-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600 mt-2'>
                    Age of deceased
                  </dt>
                  <dd className='mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    <TextField name='age' value={form.age} />
                    <div className='bg-gray-50 px-1 py-1 flex items-end sm:gap-4 sm:px-0'>
                      <span className='text-sm font-bold text-gray-600'>
                        Sex
                      </span>
                      <TextField
                        select
                        className='min-w-128'
                        name='gender'
                        value={form.gender}
                        onChange={handleChange}
                        fullWidth
                      >
                        <MenuItem value=''>Select sex</MenuItem>
                        {['Male', 'Female'].map((sex) => (
                          <MenuItem key={sex} value={sex}>
                            {sex}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </dd>
                </div>
              </dl>

              <div>
                <p className='text-xs'>
                  and as such has the paramount right to direct the disposition
                  of the body of the deceased.
                </p>
                <p className='text-xs'>
                  The undersigned authorizes and directs the OMEGA FUNERAL HOME,
                  its employees, independent contractors and agents (including
                  apprentices and/or mortuary students) to take possession of
                  the body of the deceased and transfer it to the Omega Funeral
                  Home facility or any other facility equipped for appropriate
                  storage.
                </p>
              </div>

              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name & Relationship</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Signature</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className='uppercase'>
                    <TableCell>
                      {form.customer ? (
                        <Fragment>
                          <span>
                            {form.customer?.firstName +
                              ' ' +
                              form.customer?.lastName}
                          </span>
                          <span>
                            ( {form.customer?.relationshipWithDeceased} )
                          </span>
                        </Fragment>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>{form.customer?.address}</TableCell>
                    <TableCell>
                      <img
                        src={
                          form.deceased_image
                            ? form.deceased_image
                            : '/assets/images/icons/paper.svg'
                        }
                        alt=''
                        className='h-64'
                      />
                    </TableCell>
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

const mapStateToProps = ({ deceasedApp, auth }) => {
  const { deceased } = deceasedApp;
  return {
    searchText: deceased.searchText,
    user: auth.user.data,
  };
};

export default withReducer(
  'deceasedApp',
  reducer
)(withRouter(connect(mapStateToProps)(AdmissionForm)));

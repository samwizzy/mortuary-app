import React, { useEffect } from 'react';
import { FuseAnimate } from '@fuse';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Icon,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/actions';
import ReactToPdf from 'react-to-pdf';

function ReleaseViewDialog(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = React.createRef();
  const releaseFormDialog = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.releaseFormDialog
  );
  const deceased = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.deceased
  );
  const user = useSelector(({ auth }) => auth.user.data);

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9, 14],
  };

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (releaseFormDialog.props.open) {
    }
  }, [releaseFormDialog.props.open]);

  function closeComposeDialog() {
    dispatch(Actions.closeReleaseFormDialog());
    history.push(`/deceased/${deceased?.id}`);
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...releaseFormDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='md'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex justify-between'>
          <Typography variant='subtitle1' color='inherit'>
            Release Form Summary
          </Typography>
          <div className='flex items-center' aria-label='Toggle star'>
            <FuseAnimate animation='transition.expandIn' delay={100}>
              <IconButton color='inherit' onClick={() => {}}>
                <Icon>mail</Icon>
              </IconButton>
            </FuseAnimate>
            <FuseAnimate animation='transition.expandIn' delay={100}>
              <ReactToPdf
                targetRef={ref}
                filename={`${releaseFormDialog.data?.nameOfDeceased}.pdf`}
                options={options}
                x={0.1}
                y={0.1}
                scale={0.94}
              >
                {({ toPdf }) => (
                  <IconButton
                    color='inherit'
                    disabled={!releaseFormDialog.data}
                    onClick={toPdf}
                  >
                    <Icon className='text-white'>print</Icon>
                  </IconButton>
                )}
              </ReactToPdf>
            </FuseAnimate>
          </div>
        </Toolbar>
      </AppBar>

      <DialogContent classes={{ root: 'p-24' }}>
        <FuseAnimate delay={100}>
          <div className='flex flex-wrap mt-0 mb-24' ref={ref}>
            <div className='w-10/12 mx-auto bg-white overflow-hidden sm:rounded-lg'>
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
                        <hr className='my-16 border-0 border-t border-solid border-grey-light' />
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
                <h2 className='uppercase text-lg italic text-gray-900'>
                  Release Form
                </h2>
              </div>

              <div className='p-24 border border-solid border-grey-light'>
                <dl>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Name of deceased
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.nameOfDeceased}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>Age</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.age
                        ? releaseFormDialog?.data?.age
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>Gender</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.gender
                        ? releaseFormDialog?.data?.gender
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Place of death
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.placeOfDeath
                        ? releaseFormDialog?.data?.placeOfDeath
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Death certified by
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.deathCertifiedBy
                        ? releaseFormDialog?.data?.deathCertifiedBy
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Date admitted
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.dateAdmitted
                        ? moment(releaseFormDialog?.data?.dateAdmitted).format(
                            'll'
                          )
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Date discharged
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.discharged
                        ? moment(releaseFormDialog?.data?.discharged).format(
                            'll'
                          )
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Corps collected by
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.corpsCollectedBy
                        ? moment(
                            releaseFormDialog?.data?.corpsCollectedBy
                          ).format('ll')
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Address of collector
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.addressOfCollector
                        ? releaseFormDialog?.data?.addressOfCollector
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Relationship with deceased
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.relationshipWithDeceased
                        ? releaseFormDialog?.data?.relationshipWithDeceased
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Destination of corpse
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.destinationOfCorpse
                        ? releaseFormDialog?.data?.destinationOfCorpse
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Corpse recieved by —{' '}
                      <em className='text-gray-800'>Name</em>
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.corpseRecievedByName
                        ? releaseFormDialog?.data?.corpseRecievedByName
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Corpse recieved by —{' '}
                      <em className='text-gray-800'>Signature</em>
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.corpseRecievedBySignature
                        ? releaseFormDialog?.data?.corpseRecievedBySignature
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Corpse released by —{' '}
                      <em className='text-gray-800'>Name</em>
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.corpseReleasedByName
                        ? releaseFormDialog?.data?.corpseReleasedByName
                        : '—'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-bold text-gray-600'>
                      Corpse released by —{' '}
                      <em className='text-gray-800'>Signature</em>
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {releaseFormDialog?.data?.corpseReleasedBySignature
                        ? releaseFormDialog?.data?.corpseReleasedBySignature
                        : '—'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='flex flex-col space-y-1 mt-16 text-red font-bold uppercase text-xs'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </FuseAnimate>
      </DialogContent>

      <DialogActions className='pr-24 justify-end'>
        <Button
          variant='contained'
          color='primary'
          onClick={closeComposeDialog}
          type='submit'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReleaseViewDialog;

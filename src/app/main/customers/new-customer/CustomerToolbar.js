import React, { useState } from 'react';
import { Icon, IconButton, Tabs, Tab } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as Actions from '../store/actions/index';

function DeceasedToolbar(props) {
  const [tabValue, setTabValue] = useState(0);
  //   const dispatch = useDispatch();
  const deceased = {};

  if (!deceased) {
    return null;
  }

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor='secondary'
            textColor='secondary'
            variant='scrollable'
            scrollButtons='auto'
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className='h-64 normal-case' label='Customer Info' />
            <Tab className='h-64 normal-case' label='Select Services' />
            <Tab className='h-64 normal-case' label='Images & Signature' />
            <Tab className='h-64 normal-case' label='Deceased Info' />
            <Tab className='h-64 normal-case' label='Deceased Documents' />
          </Tabs>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(DeceasedToolbar);

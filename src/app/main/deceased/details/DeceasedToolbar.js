import React, { useState } from 'react';
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import { Button, Icon, IconButton, MenuItem, Popover } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { /*useDispatch,*/ useSelector } from 'react-redux';
// import * as Actions from '../store/actions/index';

function DeceasedToolbar(props) {
  // const dispatch = useDispatch();
  const match = useRouteMatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const deceased = useSelector(({deceasedApp}) => deceasedApp.deceased.deceased);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton>
            <Icon>edit</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <>
          <Button aria-describedby={id} onClick={handleClick}>
            Options <Icon>expand_more</Icon>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem component={Link} to={`/deceased/${match.params.id}/relatives`}>View relatives</MenuItem>
            <MenuItem component={Link} to={`/customers/${deceased?.customer?.id}`}>View deceased's customer</MenuItem>
            <MenuItem component={Link} to={`/deceased/${match.params.id}/admission-form`}>Print admission form</MenuItem>
            <MenuItem component={Link} to={`/deceased`} disabled>View embalmming report</MenuItem>
            <MenuItem component={Link} to={`/deceased`} disabled>Fill embalmming report</MenuItem>
            <MenuItem component={Link} to={`/deceased`} disabled>Print embalmming report</MenuItem>
            <MenuItem component={Link} to={`/deceased/${match.params.id}/release-form`}>Release corpse</MenuItem>
          </Popover>
          </>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(DeceasedToolbar);

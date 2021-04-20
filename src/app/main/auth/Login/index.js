import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './components/LoginForm';
// import * as AuthActions from '../../../auth/store/actions';

export function LoginPage(props) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

LoginPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default React.memo(LoginPage);

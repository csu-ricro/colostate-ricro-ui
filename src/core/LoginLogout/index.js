import { connect } from 'react-redux';
import { login, logout } from './actions';
import LoginLogoutComponent from './component';

const mapStateToProps = state => {
  return {
    auth: state.config.auth,
    hasAutoLogin: state.config.app.hasAutoLogin,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: user => {
      dispatch(login(user));
    },
    handleLogout: () => {
      dispatch(logout());
    },
  };
};

const LoginLogout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginLogoutComponent);

export default LoginLogout;

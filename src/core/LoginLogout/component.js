import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import IconAccountCircle from 'mdi-material-ui/AccountCircle';
import IconLoginVariant from 'mdi-material-ui/LoginVariant';
import IconLogoutVariant from 'mdi-material-ui/LogoutVariant';
import PropTypes from 'prop-types';
import React from 'react';
import userDefaultProfileImg from '../../assets/img/default-profile.svg';
import IconSnackbarContent from '../../component/IconSnackbarContent';
import UserProfile from '../../component/UserProfile';
import NavList from '../Nav/NavList';
import styles from './styles';

const hasLoginSuccess = window.location.hash === '#login-success';
const loadingProgressCircle = <CircularProgress color="secondary" size={24} />;

class LoginLogoutComponent extends React.Component {
  state = {
    isLoginLoading: false,
    isLogoutLoading: false,
    isUserProfileOpen: false,
    snackbar: {
      open: false,
      variant: null,
      message: '',
    },
  };

  handleOpenUserProfile = () => {
    this.setState({
      isUserProfileOpen: true,
    });
  };

  handleCloseUserProfile = () => {
    this.setState({
      isUserProfileOpen: false,
    });
  };

  handleToggleDropDown = () => {
    this.setState(state => ({
      isDropDownOpen: !state.isDropDownOpen,
    }));
  };

  handleSnackbarClose = () => {
    this.setState(state => ({
      snackbar: {
        ...state.snackbar,
        open: false,
      },
    }));
  };

  handleLogin = () => {
    /*
     * When a user logs in and they don't have a current Shibboleth session
     * they are redirected to the Shibboleth login page. When they are returned
     * by the login page (auth.host+auth.loginPath) the application cannot know if it
     * should perform a login check again (unless hasAutoLogin is true in
     * config).
     *
     * To get around this the login page '#login-success' appended to the end
     * of the url as a hash value. The app checks window.location.hash to see
     * if it should perform a login check and then rests the hash value to
     * remove it from the url.
     *
     * Doesn't use api.axios instance because the baseURL of api.axios points
     * to the current version of the API. Authentication is at least one level
     * higher.
     */
    this.setState({ isLoginLoading: true });
    const { auth } = this.props;
    axios
      .get(auth.host + auth.loginPath, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'redirect') {
          const redirect = response.data.result.includes('?')
            ? `${response.data.result}&`
            : `${response.data.result}?`;
          window.location = `${redirect}return=${window.location.href}`;
        }

        this.props.handleLogin(response.data.result);
        if (hasLoginSuccess) {
          // resets window.location.hash to remove unneeded #login-success
          window.history.replaceState(null, null, ' ');
        }
        this.setState({
          isLoginLoading: false,
          snackbar: {
            open: true,
            variant: 'success',
            message: 'Successfully logged in!',
          },
        });
      })
      .catch(() => {
        this.setState({
          isLoginLoading: false,
          snackbar: {
            open: true,
            variant: 'error',
            message: 'Failed to login. Please contact us if this error persists.',
          },
        });
      });
  };

  checkIsShibbolethLoggedIn = () => {
    this.setState({ isLoginLoading: true });
    const { auth } = this.props;
    axios
      .get(auth.host + auth.shibPath)
      .then(response => {
        if (response.data.status === 'success') {
          this.props.handleLogin(response.data.result);
          this.setState({
            snackbar: {
              open: true,
              variant: 'info',
              message: 'Single sign-on session detected. Automatically logged in!',
            },
          });
        }
        this.setState({ isLoginLoading: false });
      })
      .catch(() => {
        this.setState({ isLoginLoading: false });
      });
  };

  handleLogout = () => {
    this.setState({ isLogoutLoading: true });
    const { auth } = this.props;
    axios
      .get(auth.host + auth.logoutPath, { withCredentials: true })
      .then(() => {
        this.props.handleLogout();
        this.setState({
          isLogoutLoading: false,
          snackbar: {
            open: true,
            variant: 'success',
            message:
              'Successfully logged out! You must fully close your browser to logout completely.',
          },
        });
      })
      .catch(() => {
        this.setState({
          isLogoutLoading: false,
          snackbar: {
            open: true,
            variant: 'error',
            message: 'Failed to logout. Please contact us if this error persists.',
          },
        });
      });
  };

  createNavItems = () => {
    const { isLoginLoading, isLogoutLoading } = this.state;
    const { user } = this.props;
    return [
      [
        {
          name: this.isLoggedIn() ? user.displayName : 'Login',
          icon: isLoginLoading ? loadingProgressCircle : this.createLoginIcons(),
          onClick: this.isLoggedIn() ? null : this.handleLogin,
          disabled: isLoginLoading,
          dense: true,
          subNav: !this.isLoggedIn()
            ? null
            : [
                [
                  {
                    name: 'Account',
                    icon: <IconAccountCircle />,
                    onClick: this.handleOpenUserProfile,
                  },
                  {
                    name: 'Logout',
                    icon: isLogoutLoading ? loadingProgressCircle : <IconLogoutVariant />,
                    onClick: this.handleLogout,
                    disabled: isLogoutLoading,
                  },
                ],
              ],
        },
      ],
    ];
  };

  createLoginIcons = () => {
    const { classes, user } = this.props;
    return this.isLoggedIn() ? (
      <Avatar
        className={classes.profileAvatar}
        alt={`${user.displayName}'s profile image`}
        src={user.profileImage ? user.profileImage.replace('large', 'icon') : userDefaultProfileImg}
      />
    ) : (
      <IconLoginVariant />
    );
  };

  isLoggedIn = () => Boolean(this.props.user !== 'loggedout' && this.props.user != null);

  componentDidMount = () => {
    if (hasLoginSuccess || this.props.hasAutoLogin) {
      this.handleLogin();
    } else {
      this.checkIsShibbolethLoggedIn();
    }
  };

  render() {
    const { user } = this.props;
    const { isUserProfileOpen, snackbar } = this.state;

    return (
      <React.Fragment>
        <NavList nav={this.createNavItems()} listProps={{ disablePadding: true }} />
        {this.isLoggedIn() && (
          <UserProfile
            variant="dialog"
            user={user}
            open={isUserProfileOpen}
            onClose={this.handleCloseUserProfile}
          />
        )}
        <Portal>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
          >
            <IconSnackbarContent
              variant={snackbar.variant}
              onClose={this.handleSnackbarClose}
              message={snackbar.message}
              disableAction
            />
          </Snackbar>
        </Portal>
      </React.Fragment>
    );
  }
}

LoginLogoutComponent.propTypes = {
  auth: PropTypes.object.isRequired, // redux state
  classes: PropTypes.object.isRequired, // MUI withStyles()
  handleLogin: PropTypes.func.isRequired, // redux - index.js:mapDispatchToProps
  handleLogout: PropTypes.func.isRequired, // redux - index.js:mapDispatchToProps
  hasAutoLogin: PropTypes.bool.isRequired, // redux state
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // redux state
};

export default withStyles(styles)(LoginLogoutComponent);

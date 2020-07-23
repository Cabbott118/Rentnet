import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// MUI Icons
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// Components
import AccountTiles from '../components/AccountTiles';
import Logout from '../components/auth/Logout';
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '2rem',
    borderBottom: '1px solid #ececec',
  },
  containerBottom: {
    padding: '2rem',
  },
  paper: {
    height: '100px',
    width: '100px',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '15%',
    left: '32.5px',
  },
  tileText: {
    position: 'absolute',
    bottom: '10px',
  },
  manageButton: {
    color: '#fff',
    textTransform: 'none',
  },
  hostInfoLink: {
    textTransform: 'none',
  },
  welcomeMessage: {},
});

export class Account extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const {
      classes,
      auth: { user, isLoading },
    } = this.props;
    if (!user) {
      return <LoadingSpinner loading={isLoading} />;
    } else {
      return (
        <Fragment>
          <Container className={classes.container}>
            <Typography variant='h4' className={classes.welcomeMessage}>
              Welcome, {user.first_name}!
            </Typography>
            <Typography variant='h6'>Account Dashboard</Typography>
            <Typography variant='h6'>{user.email}</Typography>
            {user.is_admin ? (
              <Typography variant='body2'>Admin Account</Typography>
            ) : null}
          </Container>
          <AccountTiles />
          {/* BELOW THE BREAK */}
          {user.is_host ? null : (
            <Container className={classes.container}>
              <Fragment>
                <Button
                  color='primary'
                  variant='outlined'
                  className={classes.hostInfoLink}
                  component={Link}
                  to='/hostinfo'
                >
                  Start Hosting
                  <ChevronRightIcon fontSize='small' color='primary' />
                </Button>
              </Fragment>
            </Container>
          )}
          <Container className={classes.containerBottom}>
            <Logout />
          </Container>
        </Fragment>
      );
    }
  }
}

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(
  withStyles(styles)(Account)
);

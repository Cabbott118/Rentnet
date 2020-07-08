import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// Components
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
  manageButton: {
    color: '#fff',
    textTransform: 'none',
  },
  hostInfoLink: {
    textDecoration: 'none',
  },
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
            <Typography variant='h4'>Welcome, {user.first_name}!</Typography>
            <Typography variant='h6'>{user.email}</Typography>
            {user.is_admin ? (
              <Typography variant='body2'>Admin Account</Typography>
            ) : null}
          </Container>
          {/* BELOW THE BREAK */}
          <Container className={classes.container}>
            <div>
              {user.is_host ? (
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.manageButton}
                  component={Link}
                  to='/mylistings'
                >
                  Manage Listings
                </Button>
              ) : (
                <Typography
                  color='primary'
                  className={classes.hostInfoLink}
                  component={Link}
                  to='/hostinfo'
                >
                  Learn how to become a Host
                </Typography>
              )}
            </div>
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

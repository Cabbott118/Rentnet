import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// MUI Icons
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';

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
    textDecoration: 'none',
  },
});

export class Account extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  clicky = () => {
    console.log('hello');
  };

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
          <Container className={classes.container}>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='center'
              spacing={2}
            >
              <Grid item>
                <Paper elevation={3} className={classes.paper}>
                  <AccountBoxIcon
                    color='primary'
                    fontSize='large'
                    className={classes.icon}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                    className={classes.tileText}
                  >
                    Account Information
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={3} className={classes.paper}>
                  <EditIcon
                    color='primary'
                    fontSize='large'
                    className={classes.icon}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                    className={classes.tileText}
                  >
                    Edit Account Details
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={3} className={classes.paper}>
                  <ViewListIcon
                    color='primary'
                    fontSize='large'
                    className={classes.icon}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                    className={classes.tileText}
                  >
                    Manage Listings
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={3} className={classes.paper}>
                  <SettingsIcon
                    color='primary'
                    fontSize='large'
                    className={classes.icon}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                    className={classes.tileText}
                  >
                    Account Settings
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          {/* BELOW THE BREAK */}
          <Container className={classes.container}>
            <Fragment>
              {user.is_host ? (
                <Grid
                  container
                  direction='column'
                  justify='flex-start'
                  alignItems='flex-start'
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      className={classes.manageButton}
                      component={Link}
                      to='/addlisting'
                    >
                      Add Listing
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      className={classes.manageButton}
                      component={Link}
                      to='/mylistings'
                    >
                      Manage Listings
                    </Button>
                  </Grid>
                </Grid>
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
            </Fragment>
          </Container>
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

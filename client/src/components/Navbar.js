import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import Register from './auth/Register';
import Login from './auth/Login';

// Redux
import { connect } from 'react-redux';

// MUI
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  button: {
    textTransform: 'none',
    fontWeight: '750',
  },
  profileButton: {
    color: '#fff',
    textTransform: 'none',
    fontWeight: '750',
  },
};

export class Navbar extends Component {
  render() {
    const {
      auth: { isAuthenticated, user },
      classes,
    } = this.props;
    return (
      <AppBar color='inherit'>
        <Container maxWidth='lg'>
          <Toolbar variant='dense'>
            <Button
              color='inherit'
              className={classes.button}
              component={Link}
              to='/'
            >
              Logo
            </Button>
            <div style={{ marginLeft: 'auto' }}>
              <Fragment>
                {/* <Button
                  color='inherit'
                  className={classes.button}
                  component={Link}
                  to='/'
                >
                  Home
                </Button> */}
              </Fragment>
              {isAuthenticated ? (
                <Fragment>
                  <Button
                    color='primary'
                    variant='contained'
                    className={classes.profileButton}
                    component={Link}
                    to='/account'
                  >
                    {user ? user.first_name : 'Profile'}
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Register />
                  <Login />
                </Fragment>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Navbar));

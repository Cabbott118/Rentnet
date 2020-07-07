import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    color: '#fff',
    textTransform: 'none',
    position: 'relative',
    float: 'right',
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    marginTop: '1rem',
  },
  progressSpinner: {
    position: 'absolute',
  },
});

class Login extends Component {
  state = {
    open: false,
    email: '',
    password: '',
    msg: null,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    // Attempt to login
    this.props.login(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { msg } = this.state;

    return (
      <Fragment>
        <Button
          onClick={this.handleOpen}
          color='primary'
          variant='outlined'
          style={{ textTransform: 'none' }}
        >
          Login
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='email'
                type='email'
                label='Email'
                placeholder='example@example.com'
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='password'
                type='password'
                label='Password'
                placeholder='Password'
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
              >
                Login
              </Button>
              {msg === null ? null : (
                <Typography
                  variant='subtitle2'
                  color='error'
                  className={classes.errorText}
                >
                  {msg}
                </Typography>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Login.propTypes = {
  isLoading: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(
  withStyles(styles)(Login)
);

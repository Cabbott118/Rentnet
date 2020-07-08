import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

// Redux
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    textTransform: 'none',
    fontWeight: '600',
  },
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

class Register extends Component {
  state = {
    open: false,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
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
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    } = this.state;

    const newUser = {
      first_name,
      last_name,
      email,
      password,
    };

    if (password === confirm_password) {
      this.props.register(newUser);
    } else {
      this.setState({ errors: 'Passwords must match' });
    }
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === 'REGISTER_FAIL') {
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
          variant='text'
          className={classes.button}
        >
          Sign Up
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            {msg === null ? null : <Alert severity='error'>{msg}</Alert>}
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='first_name'
                type='text'
                label='First Name'
                placeholder='John'
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='last_name'
                type='text'
                label='Last Name'
                placeholder='Smith'
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
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
              <TextField
                name='confirm_password'
                type='password'
                label='Confirm Password'
                placeholder='Confirm Password'
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
                Register
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  withStyles(styles)(Register)
);

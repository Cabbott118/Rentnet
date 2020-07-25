import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';

// Redux
import { connect } from 'react-redux';
import { loadUser, editUserDetails } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    marginTop: '5rem',
  },
  submitButton: {
    textTransform: 'none',
    color: 'white',
    marginTop: '1rem',
  },
  seperator: {
    marginTop: '1rem',
  },
});

export class EditUser extends Component {
  state = {
    new_first_name: '',
    new_last_name: '',
    current_password: '',
    new_password: '',
    confirm_new_password: '',
    msg: null,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      user: { _id, first_name, last_name, email },
    } = this.props.auth;
    if (!_id) return null;

    const {
      new_first_name,
      new_last_name,
      current_password,
      new_password,
      confirm_new_password,
    } = this.state;

    if (current_password === '') {
      this.setState({
        msg: 'Your current password is required to make any changes',
      });
      return false;
    }

    if (new_password !== confirm_new_password) {
      this.setState({
        msg: 'New passwords must match',
      });
      return false;
    }

    // Init updatedUser object and check if state values are empty
    // If empty, set existing values and send to back-end
    const updatedUser = {
      id: _id,
      first_name: new_first_name === '' ? first_name : new_first_name,
      last_name: new_last_name === '' ? last_name : new_last_name,
      email,
      current_password: current_password,
      new_password: new_password,
    };
    this.props.editUserDetails(updatedUser);
    window.location.href = '/success';
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for edit error error
      if (error.id === 'EDIT_ERROR') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    console.log(this.props);
    const {
      classes,
      auth: { user, isLoading },
    } = this.props;

    const { msg } = this.state;

    if (!user) {
      return <LoadingSpinner loading={isLoading} />;
    } else {
      return (
        <Container className={classes.container}>
          <Typography variant='h6' color='error'>
            USE AT YOUR OWN RISK, NOT FINISHED YET
          </Typography>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            spacing={2}
          >
            <Grid item xs={12} md={8}>
              <Typography variant='h6'>General Details</Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name='new_first_name'
                  type='text'
                  label='First Name'
                  variant='outlined'
                  size='small'
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  name='new_last_name'
                  type='text'
                  label='Last Name'
                  variant='outlined'
                  size='small'
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
                <Typography variant='h6' className={classes.seperator}>
                  Change Password
                </Typography>
                <TextField
                  name='current_password'
                  type='password'
                  label='Current Password'
                  placeholder='Password'
                  variant='outlined'
                  size='small'
                  className={classes.textField}
                  onChange={this.handleChange}
                  helperText='Your current password is required to make any changes'
                  fullWidth
                />
                <TextField
                  name='new_password'
                  type='password'
                  label='New Password'
                  placeholder='Password'
                  variant='outlined'
                  size='small'
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  name='confirm_new_password'
                  type='password'
                  label='Confirm New Password'
                  placeholder='Confirm New Password'
                  variant='outlined'
                  size='small'
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                />
                {msg === null ? null : <Alert severity='error'>{msg}</Alert>}
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                >
                  <Grid item>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      className={classes.submitButton}
                    >
                      Submit Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant='h6'>Current User Details</Typography>
              <Paper
                variant='outlined'
                style={{ marginTop: '.6rem', padding: '1rem' }}
              >
                <Typography
                  variant='subtitle1'
                  style={{ marginBottom: '.5rem' }}
                >
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant='subtitle1'>Registered Email:</Typography>
                <Typography
                  variant='subtitle2'
                  style={{ marginBottom: '.5rem' }}
                >
                  {user.email}
                </Typography>
                {user.is_host ? (
                  <Fragment>
                    <Typography variant='subtitle1'>Address:</Typography>
                    <Typography variant='subtitle2'>
                      {user.user_address}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      style={{ marginBottom: '.5rem' }}
                    >
                      {user.user_city}, {user.user_state}. {user.user_zip}
                    </Typography>
                    <Typography variant='subtitle1'>
                      Payment Information:
                    </Typography>
                    <Typography variant='subtitle2'>
                      Bank Name: {user.user_bank_name}
                    </Typography>
                    <Typography variant='subtitle2'>
                      Account Number: {user.user_account_number}
                    </Typography>
                    <Typography variant='subtitle2'>
                      Routing Number: {user.user_routing_number}
                    </Typography>
                  </Fragment>
                ) : null}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      );
    }
  }
}

EditUser.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser, editUserDetails })(
  withStyles(styles)(EditUser)
);

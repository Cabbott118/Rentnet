import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '3rem',
  },
  button: {
    textTransform: 'none',
    marginTop: '2rem',
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
        <Container className={classes.container}>
          <Typography variant='h6' color='textPrimary' align='center'>
            Success! Your changes have been made.
          </Typography>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item>
              <Button
                variant='outlined'
                color='inherit'
                className={classes.button}
                component={Link}
                to='/account'
              >
                Back to Account
              </Button>
            </Grid>
          </Grid>
        </Container>
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

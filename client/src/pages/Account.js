import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// Components
import Logout from '../components/auth/Logout';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '2rem',
    borderBottom: '1px solid #ececec',
  },
});

export class Account extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const {
      classes,
      auth: { user },
    } = this.props;

    if (!user) {
      return (
        <Container className={classes.container}>
          <Typography variant='h6'>Loading...</Typography>
        </Container>
      );
    }

    return (
      <Fragment>
        <Container className={classes.container}>
          <Typography variant='h4'>Welcome, {user.first_name}!</Typography>
          <Typography variant='h6'>{user.email}</Typography>
        </Container>
        <Container>
          <Logout />
        </Container>
      </Fragment>
    );
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class Logout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Button
        color='primary'
        variant='outlined'
        onClick={this.props.logout}
        className={classes.button}
      >
        Logout
      </Button>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(withStyles(styles)(Logout));

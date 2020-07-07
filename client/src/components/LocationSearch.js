import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  hero: {
    width: '100vw',
    height: '300px',

    background: '#E4E5E6',
    background: '-webkit-linear-gradient(to right, #E4E5E6, #00416A)',
    background: 'linear-gradient(to right, #E4E5E6, #00416A)',
  },
  button: {
    textTransform: 'none',
    marginTop: 10,
    position: 'relative',
    height: '56px',
    width: '223px',
  },
});

export class LocationSearch extends Component {
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.textField} noValidate autoComplete='off'>
        <TextField
          className={classes.textField}
          id='filled-basic'
          label='Location'
          variant='filled'
        />
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Search
        </Button>
      </form>
    );
  }
}

LocationSearch.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(LocationSearch));

import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';
import { getFilteredItems } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  input: {
    color: 'white',
  },
  label: {
    '& .MuiFormLabel-root': {
      color: 'white',
    },
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#FF6E3F !important',
  },
});

export class Search extends Component {
  state = {
    location: '',
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { location } = this.state;
    localStorage.setItem('search_location', JSON.stringify(location));
    this.props.getFilteredItems(location);
    // window.location.href = `/listings/${location}`;
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label='Search Trailers...'
          variant='outlined'
          color='secondary'
          name='location'
          autoComplete='off'
          fullWidth
          onChange={this.onChange}
          className={classes.label}
          InputProps={{
            classes: {
              input: classes.input,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </form>
    );
  }
}

Search.propTypes = {
  getFilteredItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.item,
});

export default connect(mapStateToProps, { getFilteredItems })(
  withStyles(styles)(Search)
);

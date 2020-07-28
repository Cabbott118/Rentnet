import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';

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
    let { location } = this.state;

    if (location === '') {
      window.location.href = '/search';
    } else {
      location = location.charAt(0).toUpperCase() + location.slice(1);
      localStorage.setItem('search_location', JSON.stringify(location));
      window.location.href = `/search/${location}`;
    }
  };

  render() {
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

Search.propTypes = {};

const mapStateToProps = (state) => ({
  items: state.item,
});

export default connect(mapStateToProps, {})(withStyles(styles)(Search));

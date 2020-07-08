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
  };

  render() {
    return (
      <form>
        <TextField
          label='Search Trailers'
          variant='outlined'
          color='primary'
          fullWidth
        />
      </form>
    );
  }
}

Search.propTypes = {
  getFilteredItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filtered_results: state.item.filtered_results,
});

export default connect(mapStateToProps, { getFilteredItems })(
  withStyles(styles)(Search)
);

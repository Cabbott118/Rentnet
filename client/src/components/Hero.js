import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import Search from '../components/Search';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    color: '#fff',
    textTransform: 'none',
    margin: '1.5rem .6rem',
    position: 'relative',
  },
});

export class Hero extends Component {
  render() {
    return (
      <Grid
        spacing={2}
        container
        direction='column'
        justify='center'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={6}>
          <Typography
            variant='h4'
            color='secondary'
            style={{ marginTop: '1rem' }}
          >
            The modern solution for your trailer rental needs.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            style={{ marginTop: '1rem' }}
            variant='subtitle1'
            color='secondary'
          >
            Renting trailers is now as simple as clicking a button!
          </Typography>
          <Typography variant='subtitle1' color='secondary'>
            Browse our listings by searching below (currently not hooked up), or
            click{' '}
            <Typography
              component={Link}
              to='/listings'
              style={{ textDecoration: 'none', color: '#FF6E3F' }}
            >
              HERE
            </Typography>{' '}
            to view all.
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction='row'
          justify='flex-start'
          alignItems='center'
          style={{ marginTop: '2rem' }}
        >
          <Grid item xs={12} sm={6}>
            <Search />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Hero.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Hero));

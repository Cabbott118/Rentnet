import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';

// Components
import TrailerCard from '../components/TrailerCard';
import MapContainer from '../components/maps/MapContainer';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  trailerContainer: {
    padding: '2rem 1rem',
  },
  map: {
    position: 'sticky',
    top: 50,
  },
});

export class Listings extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
        className={classes.gridContainer}
      >
        <Grid item xs={12} md={6} className={classes.trailerContainer}>
          <TrailerCard />
        </Grid>

        <Grid item xs={12} md={6} className={classes.map}>
          <MapContainer />
        </Grid>
      </Grid>
    );
  }
}

Listings.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(
  withStyles(styles)(Listings)
);

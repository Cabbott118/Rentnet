import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// Components
import TrailerCard from '../components/TrailerCard';
import MapContainer from '../components/maps/MapContainer';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '1.5rem',
  },
  searchGrid: {
    marginBottom: '1rem',
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
      <Container className={classes.container}>
        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} md={6}>
            <TrailerCard />
          </Grid>

          <Grid item xs={12} md={6} className={classes.map}>
            <MapContainer />
          </Grid>
        </Grid>
      </Container>
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

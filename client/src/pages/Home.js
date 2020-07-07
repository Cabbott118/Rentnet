import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import Hero from '../components/Hero';
// import AboutUs from '../components/AboutUs';

// MUI

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Hero />
      </Fragment>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Home));

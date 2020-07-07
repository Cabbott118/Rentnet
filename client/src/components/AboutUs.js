import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Utils
// import imgOne from '../utility/images/imgOne.jpg';
// import imgTwo from '../utility/images/imgTwo.png';
// import imgThree from '../utility/images/imgThree.png';

// MUI
import Container from '@material-ui/core/Container';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class AboutUs extends Component {
  render() {
    const { classes } = this.props;
    return <Container></Container>;
  }
}

AboutUs.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withStyles(styles)(AboutUs));

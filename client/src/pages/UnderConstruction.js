import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import underConstructionImage from '../utility/images/undraw_under_construction_46pa.png';

// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '2rem',
  },
  underConstruction: {
    width: '100%',
    height: 'auto',
  },
});

export class UnderConstruction extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const {
      classes,
      auth: { user },
    } = this.props;
    return (
      <Container className={classes.container}>
        {user ? (
          <Fragment>
            <Typography variant='h4' color='primary'>
              Hi, {user.first_name}!
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              We apologize for the inconvenience, but this section is still
              under construction.
            </Typography>
          </Fragment>
        ) : null}

        <img
          src={underConstructionImage}
          alt='Under Construction'
          className={classes.underConstruction}
        />
      </Container>
    );
  }
}

UnderConstruction.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(
  withStyles(styles)(UnderConstruction)
);

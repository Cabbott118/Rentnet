import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// MUI Icons
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { getItemById } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '1rem 3rem',
  },
  containerLower: {
    padding: '0 3rem',
  },
  button: {
    textTransform: 'none',
  },
});

export class TrailerPage extends Component {
  state = {
    trailerIdParam: null,
    trailer: null,
    loading: true,
  };

  componentDidMount() {
    this.props.loadUser();
    // Pull trailer ID from url and assign, then filter
    const trailerId = this.props.match.params.id;
    if (trailerId) this.setState({ trailerIdParam: trailerId });
    this.props.getItemById(trailerId);

    // TODO: Decide between setting timeout to ensure data has time to
    //       load, or pulling trailer data from props
    //       *** Data already accessible via both methods in current
    //            set up ***
    setTimeout(() => {
      this.setState({ loading: false, trailer: this.props.item.item[0] });
    }, 1000);
  }

  render() {
    const { loading, trailer } = this.state;
    const { classes } = this.props;

    if (loading) {
      return <LoadingSpinner loading={loading} />;
    }

    const {
      brand,
      trailer_type,
      deck_dimensions,
      weight,
      trailer_city,
      trailer_state,
      currently_available,
    } = trailer;

    return (
      <Fragment>
        <Container className={classes.container}>
          <Button
            variant='text'
            className={classes.button}
            component={Link}
            to='/listings'
          >
            <KeyboardReturnIcon
              fontSize='small'
              style={{ marginRight: '.5rem' }}
            />
            Back to Listings
          </Button>
        </Container>
        <Container className={classes.containerLower}>
          <Typography variant='h6'>Temporary Display (Testing Data)</Typography>
          <Typography variant='body1'>{brand}</Typography>
          <Typography variant='body1'>{trailer_type}</Typography>
          <Typography variant='body1'>{deck_dimensions}</Typography>
          <Typography variant='body1'>{weight}</Typography>
          <Typography variant='body1'>{trailer_city}</Typography>
          <Typography variant='body1'>{trailer_state}</Typography>
          <Typography variant='body1'>
            {currently_available ? 'Available' : 'Not Available'}
          </Typography>
        </Container>
      </Fragment>
    );
  }
}

TrailerPage.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

export default connect(mapStateToProps, { loadUser, getItemById })(
  withStyles(styles)(TrailerPage)
);

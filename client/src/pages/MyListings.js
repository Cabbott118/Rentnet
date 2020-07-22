import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { getItems } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '2rem',
  },
});

export class MyListings extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }

  render() {
    const {
      classes,

      auth: { user, isLoading },
      item: { items },
    } = this.props;

    if (!user) {
      return <LoadingSpinner loading={isLoading} />;
    } else {
      const userID = user._id;
      return (
        <Container className={classes.container}>
          {items.map(
            ({
              _id,
              owner_id,
              brand,
              trailer_type,
              deck_dimensions,
              weight,
              price,
              trailer_city,
            }) => (
              <Grid
                key={_id}
                container
                direction='row'
                justify='flex-start'
                alignItems='flex-start'
                spacing={2}
              >
                {userID === owner_id ? (
                  <Fragment>
                    <Grid item>{brand}</Grid>
                    <Grid item>{trailer_type}</Grid>
                    <Grid item>{deck_dimensions}</Grid>
                    <Grid item>{weight}</Grid>
                    <Grid item>{price}</Grid>
                    <Grid item>{trailer_city}</Grid>
                  </Fragment>
                ) : null}
              </Grid>
            )
          )}
        </Container>
      );
    }
  }
}

MyListings.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

export default connect(mapStateToProps, { loadUser, getItems })(
  withStyles(styles)(MyListings)
);

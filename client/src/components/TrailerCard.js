import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// MUI Icons
import InfoIcon from '@material-ui/icons/InfoOutlined';

// Components
import LoadingSpinner from './LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { getFilteredItems, getItems } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  trailerPaper: {
    width: '100%',
    minHeight: '200px',
    position: 'relative',
  },
  image: {
    height: '200px',
    width: '100%',
    borderRadius: '5px',
  },
  bottomItem: {
    width: '100%',
    marginTop: '2rem',
  },
  trailerButton: {
    textTransform: 'none',
  },
});

export class TrailerCard extends Component {
  state = {
    search_location: '',
  };

  componentDidMount() {
    let search = JSON.parse(localStorage.getItem('search_location'));
    this.props.loadUser();

    this.setState({
      search_location: search,
    });
    if (!search) {
      this.props.getItems();
    } else {
      this.props.getFilteredItems(search);
    }
  }

  render() {
    const {
      classes,
      item: { items, loading },
    } = this.props;

    if (loading) {
      return <LoadingSpinner loading={loading} />;
    }

    const listings = (
      <Grid container direction='column' justify='flex-start' spacing={2}>
        {items.map(
          ({
            _id,
            brand,
            trailer_type,
            trailer_city,
            date,
            weight,
            deck_dimensions,
            price,
          }) => (
            <Grid item xs={12} sm={12} md={12} key={_id}>
              <Paper variant='outlined' className={classes.trailerPaper}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <img
                      alt={brand}
                      src='https://media.istockphoto.com/photos/new-cargo-cart-picture-id135449272'
                      className={classes.image}
                    />
                  </Grid>
                  <Grid item xs={12} md={8} style={{ padding: '1rem' }}>
                    <Grid
                      container
                      direction='column'
                      justify='flex-start'
                      alignItems='flex-start'
                      spacing={1}
                    >
                      <Grid item>
                        <Typography variant='body1'>
                          {trailer_type} trailer in {trailer_city}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='h6'>
                          {deck_dimensions} ft. - {brand}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='body1'>
                          Rated for a capacity of {weight} lbs.
                        </Typography>
                      </Grid>
                      <Grid item className={classes.bottomItem}>
                        <Grid
                          container
                          direction='row'
                          justify='space-between'
                          alignItems='center'
                        >
                          <Grid item>
                            <Typography variant='subtitle1'>
                              ${price} / day
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              variant='outlined'
                              color='primary'
                              className={classes.trailerButton}
                              component={Link}
                              to={`/search/${trailer_city}/${_id}`}
                            >
                              More Info
                              <InfoIcon
                                fontSize='small'
                                style={{ marginLeft: '.5rem' }}
                              />
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        )}
      </Grid>
    );

    return <Fragment>{listings}</Fragment>;
  }
}

TrailerCard.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getFilteredItems: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

export default connect(mapStateToProps, {
  loadUser,
  getFilteredItems,
  getItems,
})(withStyles(styles)(TrailerCard));

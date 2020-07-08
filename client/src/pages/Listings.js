import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { getItems, searchItems } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '2rem',
  },
  root: {
    flexGrow: 1,
    margin: '1rem',
  },
  paper: {
    padding: '.8rem',
    margin: 'auto',
    minWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export class Listings extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }

  render() {
    console.log('PROPS:', this.props);
    const {
      classes,
      item: { items, loading },
    } = this.props;

    if (loading) {
      return <LoadingSpinner loading={loading} />;
    } else {
      const listings = (
        <Fragment>
          {items.map(
            ({
              _id,
              brand,
              trailer_type,
              item_location,
              date,
              deck_dimensions,
              price,
            }) => (
              <div key={_id} className={classes.root}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img
                          className={classes.img}
                          alt='Trailer'
                          src='https://via.placeholder.com/250x150'
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction='column' spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant='subtitle1'>
                            {trailer_type} Trailer
                          </Typography>
                          <Typography variant='body2' color='textSecondary'>
                            {brand}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='primary'
                            gutterBottom
                          >
                            {item_location}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button variant='outlined' color='primary'>
                            Rent
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle1'>
                          ${price}/Day
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            )
          )}
        </Fragment>
      );

      return (
        <Container className={classes.container}>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='flex-start'
          >
            {listings}
          </Grid>
        </Container>
      );
    }
  }
}

Listings.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

export default connect(mapStateToProps, { loadUser, getItems })(
  withStyles(styles)(Listings)
);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Utils
import imgOne from '../utility/images/undraw_at_home_octe.png';
import imgTwo from '../utility/images/undraw_neighbors_ciwb.png';

// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

const gridContainer = {
  margin: '2rem auto',
  borderRadius: '10px',
  boxShadow: '3px 3px 5px 1px rgba(0, 0, 0, .3)',
};

const gridItem = {
  padding: '1rem',
};

const header = {
  borderBottom: '1px solid #ececec',
  padding: '10px 10px 0px 10px',
};

const body = {
  padding: '10px',
};

const img = {
  width: '250px',
};

export class MainContent extends Component {
  render() {
    return (
      <Container>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          style={gridContainer}
        >
          <Hidden smDown>
            <Grid item style={gridItem} sm={4}>
              <img src={imgOne} alt='Why choose us?' style={img} />
            </Grid>
          </Hidden>
          <Grid item style={gridItem} xs={12} sm={8}>
            <Typography variant='h6' style={header}>
              Why Choose Us?
            </Typography>
            <Typography variant='body2' color='textSecondary' style={body}>
              Whether you're looking to rent, or list your personal trailer to
              earn some additional income, Rent-Net is the right place for you.
              Avoid the headache of going through a large company to rent
              something of theirs for an absurd price and connect with one of
              our many members who are listing their trailers at an affordable
              price, right next door!
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          style={gridContainer}
        >
          <Grid item style={gridItem} xs={12} sm={8}>
            <Typography variant='h6' style={header}>
              How This Works
            </Typography>
            <Typography variant='body2' color='textSecondary' style={body}>
              You can browse the site as much as you like without commiting to
              anything, but of course to rent and list, you will need to
              register an account with us. Once an account is registered, you
              can immediately begin renting our posted trailers. If you wish to
              list a trailer of your own, you will need to complete some
              additional information, which can be found within the account
              page.
            </Typography>
          </Grid>
          <Hidden smDown>
            <Grid item style={gridItem} sm={4}>
              <img src={imgTwo} alt='How this works' style={img} />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    );
  }
}

MainContent.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(MainContent);

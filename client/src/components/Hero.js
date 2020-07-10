import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Util
// import undraw from '../utility/images/undraw_best_place_r685.png';

// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  hero: {
    margin: '3rem auto',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  button: {
    color: '#fff',
    textTransform: 'none',
    margin: '1rem .6rem',
    position: 'relative',
  },
});

export class Hero extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.hero}>
        <Container>
          <Grid container direction='row' alignItems='center' spacing={2}>
            <Grid item sm={6} md={6}>
              {/* <Typography variant='h3' color='primary'>
                Rent-Net
              </Typography> */}
              <Typography
                variant='h5'
                color='inherit'
                style={{ marginTop: '3rem' }}
              >
                the modern solution for your trailer rental needs.
              </Typography>
              <TextField
                id='outlined-basic'
                label='Search Trailers...'
                variant='outlined'
                color='secondary'
                fullWidth
                style={{ marginTop: '1rem' }}
              />
              {/* <Button
                color='primary'
                variant='contained'
                className={classes.button}
                component={Link}
                to='/listings'
              >
                Search Trailers
              </Button> */}
              <Typography
                style={{ marginTop: '1rem' }}
                variant='subtitle1'
                color='secondary'
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
              <Button
                color='primary'
                variant='contained'
                className={classes.button}
                component={Link}
                to='/aboutus'
              >
                About Us
              </Button>
              <Button
                color='primary'
                variant='contained'
                className={classes.button}
                component={Link}
                to='/listings'
              >
                Search Trailers
              </Button>
            </Grid>
            <Grid item sm={6} md={6}>
              {/* <img src={undraw} alt='' className={classes.img} /> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

Hero.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Hero));

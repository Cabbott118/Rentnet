import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Util
import undraw from '../utility/images/undraw_best_place_r685.png';

// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  hero: {
    margin: '4rem auto',
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
              <Typography variant='h2' color='primary'>
                Rent-Net
              </Typography>
              <Typography variant='h4' color='inherit'>
                the modern solution for your trailer rental needs.
              </Typography>
              <Typography
                style={{ marginTop: '1rem' }}
                variant='subtitle1'
                color='textSecondary'
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
              >
                About Us
              </Button>
              <Button
                color='primary'
                variant='contained'
                className={classes.button}
              >
                Search Trailers
              </Button>
            </Grid>
            <Grid item sm={6} md={6}>
              <img src={undraw} alt='' className={classes.img} />
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

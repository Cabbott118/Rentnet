import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '2rem',
    backgroundColor: '#E1D0C7',
    borderTop: '5px solid #C3A798',
  },
  footerLead: {
    borderBottom: '2px solid #fff',
  },
  footerItems: {
    padding: '1rem',
  },
  links: {
    textDecoration: 'none',
    color: '#333',
    padding: '.3rem',
  },
});

export class Footer extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const {
      classes,
      auth: { user },
    } = this.props;

    return (
      <div className={classes.container}>
        <Container>
          <Grid
            container
            direction='row'
            justify='space-evenly'
            alignItems='center'
            spacing={2}
          >
            <Grid item>
              <Typography
                variant='subtitle1'
                align='center'
                className={classes.footerLead}
              >
                Item One Lead
              </Typography>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={1}
                className={classes.footerItems}
              >
                <Typography
                  variant='body2'
                  component={Link}
                  to='/'
                  className={classes.links}
                >
                  Item One
                </Typography>
                <Typography
                  variant='body2'
                  component={Link}
                  to='/'
                  className={classes.links}
                >
                  Item Two
                </Typography>
                <Typography
                  variant='body2'
                  component={Link}
                  to='/'
                  className={classes.links}
                >
                  Item Three
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant='subtitle1'
                align='center'
                className={classes.footerLead}
              >
                Quick Links
              </Typography>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={1}
                className={classes.footerItems}
              >
                <Typography
                  variant='body2'
                  component={Link}
                  to='/listings'
                  className={classes.links}
                >
                  Listings
                </Typography>
                <Typography
                  variant='body2'
                  component={Link}
                  to='/aboutus'
                  className={classes.links}
                >
                  About Us
                </Typography>
                <Typography
                  variant='body2'
                  component={Link}
                  to='/underconstruction'
                  className={classes.links}
                >
                  Terms & Conditions{' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant='subtitle1'
                align='center'
                className={classes.footerLead}
              >
                Contact Us
              </Typography>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={1}
                className={classes.footerItems}
              >
                <Typography
                  variant='body2'
                  component={Link}
                  to='/'
                  className={classes.links}
                >
                  contact@rent-net.com
                </Typography>
                <Typography
                  variant='body2'
                  component={Link}
                  to='/'
                  className={classes.links}
                >
                  Our Phone Number
                </Typography>
                <Typography
                  variant='body2'
                  component={Link}
                  to='/'
                  className={classes.links}
                >
                  Off The Wall's Address
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(
  withStyles(styles)(Footer)
);

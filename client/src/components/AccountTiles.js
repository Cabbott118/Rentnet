import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// MUI Icons
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import PostAddIcon from '@material-ui/icons/PostAdd';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '2rem',
    borderBottom: '1px solid #ececec',
  },
  paper: {
    height: '100px',
    width: '100px',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '15%',
    left: '32.5px',
  },
  tileText: {
    position: 'absolute',
    bottom: '10px',
  },
});

export class AccountTiles extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    const {
      classes,
      auth: { user },
    } = this.props;

    if (!user) {
      return null;
    } else {
      return (
        <Container className={classes.container}>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
            spacing={2}
          >
            <Grid item>
              <Button style={{ textTransform: 'none' }}>
                <Paper elevation={3} className={classes.paper}>
                  <AccountBoxIcon
                    color='primary'
                    fontSize='large'
                    className={classes.icon}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                    className={classes.tileText}
                  >
                    Account Information
                  </Typography>
                </Paper>
              </Button>
            </Grid>
            <Grid item>
              <Button style={{ textTransform: 'none' }}>
                <Paper elevation={3} className={classes.paper}>
                  <EditIcon
                    color='primary'
                    fontSize='large'
                    className={classes.icon}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                    className={classes.tileText}
                  >
                    Edit Account Details
                  </Typography>
                </Paper>
              </Button>
            </Grid>

            {user.is_host ? (
              <Fragment>
                <Grid item component={Link} to='/addlisting'>
                  <Button style={{ textTransform: 'none' }}>
                    <Paper elevation={3} className={classes.paper}>
                      <PostAddIcon
                        color='primary'
                        fontSize='large'
                        className={classes.icon}
                      />
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        align='center'
                        className={classes.tileText}
                      >
                        Create New Listing
                      </Typography>
                    </Paper>
                  </Button>
                </Grid>
                <Grid item component={Link} to='/mylistings'>
                  <Button style={{ textTransform: 'none' }}>
                    <Paper elevation={3} className={classes.paper}>
                      <ViewListIcon
                        color='primary'
                        fontSize='large'
                        className={classes.icon}
                      />
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        align='center'
                        className={classes.tileText}
                      >
                        Manage Listings
                      </Typography>
                    </Paper>
                  </Button>
                </Grid>
              </Fragment>
            ) : null}
            <Grid item>
              <Button style={{ textTransform: 'none' }}>
                <Paper elevation={3} className={classes.paper}>
                  <SettingsIcon
                    color='primary'
                    fontSize='large'
                    className={classes.icon}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                    className={classes.tileText}
                  >
                    Account Settings
                  </Typography>
                </Paper>
              </Button>
            </Grid>
          </Grid>
        </Container>
      );
    }
  }
}

AccountTiles.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(
  withStyles(styles)(AccountTiles)
);

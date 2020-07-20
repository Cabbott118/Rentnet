import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import Search from '../components/Search';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    color: '#fff',
    textTransform: 'none',
    margin: '1.5rem .6rem',
    position: 'relative',
  },
});

export class Hero extends Component {
  render() {
    return (
      <Grid
        spacing={2}
        container
        direction='column'
        justify='center'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={6}>
          <Typography
            variant='h4'
            color='secondary'
            style={{ marginTop: '3rem' }}
          >
            The modern solution for your trailer rental needs.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            style={{ marginTop: '1rem' }}
            variant='subtitle1'
            color='secondary'
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction='row'
          justify='flex-start'
          alignItems='center'
        >
          <Grid item xs={12} sm={6}>
            <Search />
          </Grid>
        </Grid>
      </Grid>
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

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: '2rem',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '150px',
  },
});

const HostReviewDisplay = (props) => {
  const {
    classes,
    brand,
    trailer_type,
    deck_dimensions,
    weight,
    price,
    trailer_address,
    trailer_city,
    trailer_zip,
    trailer_state,
  } = props;
  return (
    <div>
      <Typography align='center'>
        Please review your updated information before confirming.
      </Typography>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant='h6' align='center' color='textPrimary'>
              Address:
            </Typography>
            <Typography variant='body1' align='center'>
              {trailer_address}
            </Typography>

            <Typography variant='body1' align='center'>
              {trailer_city}, {trailer_state} {trailer_zip}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant='h6' align='center' color='textPrimary'>
              Brand:
            </Typography>
            <Typography variant='body1' align='center'>
              {brand}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant='h6' align='center' color='textPrimary'>
              Other Information:
            </Typography>
            <Typography variant='body1' align='center'>
              {trailer_type}
            </Typography>
            <Typography variant='body1' align='center'>
              {deck_dimensions}
            </Typography>
            <Typography variant='body1' align='center'>
              {weight}
            </Typography>
            <Typography variant='body1' align='center'>
              {price}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(HostReviewDisplay);

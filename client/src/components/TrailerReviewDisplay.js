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
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='flex-start'
        spacing={2}
        className={classes.gridContainer}
      >
        <Grid item>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item>
              <Typography variant='h6' align='center' color='textPrimary'>
                Preferred Pick Up & Drop Off Address:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' align='center'>
                {trailer_address}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' align='center'>
                {trailer_city}, {trailer_state} {trailer_zip}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item>
              <Typography variant='h6' align='center' color='textPrimary'>
                Trailer Specific Information:
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant='body1' align='center'>
                {brand}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' align='center'>
                {trailer_type} trailer
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' align='center'>
                {deck_dimensions} (LxW)
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' align='center'>
                {weight} lbs Max Weight Capacity
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' align='center'>
                ${price}.00/day
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(HostReviewDisplay);

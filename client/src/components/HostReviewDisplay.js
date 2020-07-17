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
    userAddress,
    userCity,
    userState,
    userZip,
    userPhone,
    userBankName,
    userAccountNumber,
    userRoutingNumber,
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
              {userAddress}
            </Typography>

            <Typography variant='body1' align='center'>
              {userCity}, {userState} {userZip}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant='h6' align='center' color='textPrimary'>
              Phone Number:
            </Typography>
            <Typography variant='body1' align='center'>
              {userPhone}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant='h6' align='center' color='textPrimary'>
              Banking Information:
            </Typography>
            <Typography variant='body1' align='center'>
              {userBankName}
            </Typography>
            <Typography variant='body1' align='center'>
              {userAccountNumber}
            </Typography>
            <Typography variant='body1' align='center'>
              {userRoutingNumber}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(HostReviewDisplay);

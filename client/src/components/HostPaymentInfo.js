import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    color: 'white',
    textTransform: 'none',
    marginTop: 20,
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
});

const HostPaymentInfo = (props) => {
  const {
    values,
    handleChange,
    handleNext,
    handleBack,
    activeStep,
    classes,
  } = props;

  return (
    <Container>
      <Typography variant='body2' align='center'>
        The provided Bank Account will be where earnings are deposited.
      </Typography>
      <TextField
        label='Bank Name'
        name='userBankName'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userBankName')}
        defaultValue={values.userBankName}
        fullWidth
      />
      <TextField
        label='Bank Account Number'
        name='userAccountNumber'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userAccountNumber')}
        defaultValue={values.userAccountNumber}
        fullWidth
      />
      <TextField
        label='Bank Routing Number'
        name='userRoutingNumber'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userRoutingNumber')}
        defaultValue={values.userRoutingNumber}
        fullWidth
      />
      <Grid container direction='row' justify='flex-end' alignItems='center'>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
          variant='outlined'
          color='primary'
        >
          Back
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleNext}
          className={classes.button}
          disabled={
            (values.userBankName &&
              values.userAccountNumber &&
              values.userRoutingNumber) === ''
              ? true
              : false
          }
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
};
export default withStyles(styles)(HostPaymentInfo);

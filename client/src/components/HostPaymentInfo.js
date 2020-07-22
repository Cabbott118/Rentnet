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
        name='user_bank_name'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_bank_name')}
        defaultValue={values.user_bank_name}
        fullWidth
      />
      <TextField
        label='Bank Account Number'
        name='user_account_number'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_account_number')}
        defaultValue={values.user_account_number}
        fullWidth
      />
      <TextField
        label='Bank Routing Number'
        name='user_routing_number'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_routing_number')}
        defaultValue={values.user_routing_number}
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
            (values.user_bank_name &&
              values.user_account_number &&
              values.user_routing_number) === ''
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

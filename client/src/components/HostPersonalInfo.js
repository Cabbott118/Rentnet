import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
  buttonGroup: {
    backgroundColor: 'red',
  },
});

const HostPersonalInfo = (props) => {
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
      <TextField
        label='Address'
        name='userAddress'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userAddress')}
        defaultValue={values.userAddress}
        fullWidth
      />
      <TextField
        label='City'
        name='userCity'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userCity')}
        defaultValue={values.userCity}
        fullWidth
      />
      <TextField
        label='State'
        name='userState'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userState')}
        defaultValue={values.userState}
        fullWidth
      />
      <TextField
        label='Zip Code'
        name='userZip'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userZip')}
        defaultValue={values.userZip}
        fullWidth
      />
      <TextField
        label='Phone Number'
        name='userPhone'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userPhone')}
        defaultValue={values.userPhone}
        helperText='Please do not include anything other than numbers'
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
            (values.userAddress &&
              values.userCity &&
              values.userState &&
              values.userZip &&
              values.userPhone) === ''
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
export default withStyles(styles)(HostPersonalInfo);

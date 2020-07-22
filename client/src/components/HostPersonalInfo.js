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
        name='user_address'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_address')}
        defaultValue={values.user_address}
        fullWidth
      />
      <TextField
        label='City'
        name='user_city'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_city')}
        defaultValue={values.user_city}
        fullWidth
      />
      <TextField
        label='State'
        name='user_state'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_state')}
        defaultValue={values.user_state}
        fullWidth
      />
      <TextField
        label='Zip Code'
        name='user_zip'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_zip')}
        defaultValue={values.user_zip}
        fullWidth
      />
      <TextField
        label='Phone Number'
        name='user_phone'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('user_phone')}
        defaultValue={values.user_phone}
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
            (values.user_address &&
              values.user_city &&
              values.user_state &&
              values.user_zip &&
              values.user_phone) === ''
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

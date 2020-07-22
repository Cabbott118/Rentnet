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

const TrailerLocationInformation = (props) => {
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
        name='trailer_address'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('trailer_address')}
        defaultValue={values.trailer_address}
        fullWidth
      />
      <TextField
        label='City'
        name='trailer_city'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('trailer_city')}
        defaultValue={values.trailer_city}
        fullWidth
      />
      <TextField
        label='State'
        name='trailer_state'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('trailer_state')}
        defaultValue={values.trailer_state}
        fullWidth
      />
      <TextField
        label='Zip Code'
        name='trailer_zip'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('trailer_zip')}
        defaultValue={values.trailer_zip}
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
            (values.trailer_address &&
              values.trailer_city &&
              values.trailer_state &&
              values.trailer_zip) === ''
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
export default withStyles(styles)(TrailerLocationInformation);

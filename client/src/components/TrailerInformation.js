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

const TrailerInformation = (props) => {
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
        label='Trailer Brand'
        name='brand'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('brand')}
        defaultValue={values.brand}
        fullWidth
      />
      {/* TODO: Change this field out for dropdown ('Select' in MUI) */}
      <TextField
        label='Trailer Type'
        name='trailer_type'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('trailer_type')}
        defaultValue={values.trailer_type}
        fullWidth
      />
      <TextField
        label='Deck Dimensions'
        name='deck_dimensions'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('deck_dimensions')}
        defaultValue={values.deck_dimensions}
        fullWidth
      />
      <TextField
        label='Max Weight Rating'
        name='weight'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('weight')}
        defaultValue={values.weight}
        fullWidth
      />
      <TextField
        label='Price per Day'
        name='price'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('price')}
        defaultValue={values.price}
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
            (values.brand &&
              values.trailer_type &&
              values.deck_dimensions &&
              values.weight &&
              values.price) === ''
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
export default withStyles(styles)(TrailerInformation);

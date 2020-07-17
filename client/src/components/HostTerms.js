import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

const HostTerms = (props) => {
  const { handleNext, handleBack, activeStep, classes } = props;

  const [checked, setChecked] = React.useState(false);
  const [disabled, removeDisabled] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    removeDisabled(false);
  };

  return (
    <Container>
      <Typography variant='body1'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet. It uses
        a dictionary of over 200 Latin words, combined with a handful of model
        sentence structures, to generate Lorem Ipsum which looks reasonable. The
        generated Lorem Ipsum is therefore always free from repetition, injected
        humour, or non-characteristic words etc.
      </Typography>
      <Grid container direction='row' justify='center' alignItems='center'>
        <FormControlLabel
          value='end'
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              color='primary'
            />
          }
          label={`By checking, you agree to Rent-Net's Terms & Conditions`}
          labelPlacement='end'
        />
      </Grid>
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
          onChange={handleChange}
          disabled={disabled}
        >
          Continue
        </Button>
      </Grid>
    </Container>
  );
};
export default withStyles(styles)(HostTerms);

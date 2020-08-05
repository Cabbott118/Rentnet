import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  ...theme.spreadThis,
  imgButton: {
    textTransform: 'none',
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
  },
  imgFileName: {
    position: 'relative',
    top: 5,
    left: 10,
  },
  img: {
    height: '150px',
    display: 'table-row',
  },
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

const TrailerImageUpload = (props) => {
  const {
    handleImageChange,
    imgURL,
    imgFileName,
    handleNext,
    handleBack,
    activeStep,
    classes,
  } = props;

  return (
    <Container>
      <Button
        variant='contained'
        component='label'
        className={classes.imgButton}
      >
        Upload Image
        <input
          type='file'
          name='image'
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </Button>
      <label className={classes.imgFileName}>{imgFileName}</label>
      <img src={imgURL} alt='' className={classes.img} />

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
          disabled={imgFileName === '' ? true : false}
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
};
export default withStyles(styles)(TrailerImageUpload);

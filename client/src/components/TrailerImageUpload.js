import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  ...theme.spreadThis,
  imgContainer: {
    backgroundColor: '#eee',
    minHeight: '200px',
    width: '100%',
    borderRadius: '5px',
  },
  imgButton: {
    textTransform: 'none',
    marginTop: 20,
    marginBottom: 10,
  },
  img: {
    height: '200px',
    maxWidth: '100%',
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
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='flex-start'
      >
        <Grid item className={classes.imgContainer}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <img src={imgURL} alt='' className={classes.img} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={2}
          >
            <Grid item>
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
            </Grid>
            <Grid item style={{ marginTop: '5px' }}>
              <label>{imgFileName}</label>
            </Grid>
          </Grid>
        </Grid>
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
          disabled={imgFileName === '' ? true : false}
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
};
export default withStyles(styles)(TrailerImageUpload);

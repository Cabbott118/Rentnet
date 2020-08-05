import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import TrailerImageUpload from '../components/TrailerImageUpload';
import TrailerInformation from '../components/TrailerInformation';
import TrailerLocationInformation from '../components/TrailerLocationInformation';
import TrailerReviewDisplay from '../components/TrailerReviewDisplay';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { addImage, getImages } from '../redux/actions/imageActions';
import { addItem } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    width: '100%',
    marginTop: '5rem',
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
  buttonGroup: {},
});

function getSteps() {
  return ['Trailer Image ', 'Trailer Information', 'Pick Up & Drop Off'];
}

const steps = getSteps();

export class AddListingForm extends Component {
  state = {
    activeStep: 0,
    prevStep: null,
    imgFileName: '',
    selectedFile: null,
    imgURL: null,
    brand: '',
    trailer_type: '',
    deck_dimensions: '',
    weight: '',
    price: '',
    trailer_address: '',
    trailer_city: '',
    trailer_zip: '',
    trailer_state: '',
    msg: null,
  };

  getStepContent(stepIndex) {
    const {
      brand,
      trailer_type,
      deck_dimensions,
      weight,
      price,
      trailer_address,
      trailer_city,
      trailer_zip,
      trailer_state,
    } = this.state;

    const values = {
      brand,
      trailer_type,
      deck_dimensions,
      weight,
      price,
      trailer_address,
      trailer_city,
      trailer_zip,
      trailer_state,
    };

    switch (stepIndex) {
      case 0:
        return (
          <TrailerImageUpload
            handleImageChange={this.handleImageChange}
            imgFileName={this.state.imgFileName}
            imgURL={this.state.imgURL}
            handleBack={this.handleBack}
            handleNext={this.handleNextFromImage}
            activeStep={stepIndex}
          />
        );
      case 1:
        return (
          <TrailerInformation
            handleChange={this.handleChange}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            activeStep={stepIndex}
            values={values}
          />
        );
      case 2:
        return (
          <TrailerLocationInformation
            handleChange={this.handleChange}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            activeStep={stepIndex}
            values={values}
          />
        );

      default:
        return 'Unknown stepIndex';
    }
  }

  componentDidMount() {
    this.props.loadUser();
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleImageChange = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      imgFileName: e.target.files[0].name,
      selectedFile: e.target.files[0],
      imgURL: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleNextFromImage = () => {
    const { prevStep, activeStep, selectedFile } = this.state;
    const data = new FormData();
    data.append('image', selectedFile);
    this.props.addImage(data);

    this.setState({
      prevStep: prevStep + 1,
      activeStep: activeStep + 1,
    });
  };

  handleNext = () => {
    const { prevStep, activeStep } = this.state;
    this.setState({
      prevStep: prevStep + 1,
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { prevStep, activeStep } = this.state;
    this.setState({
      prevStep: prevStep - 1,
      activeStep: activeStep - 1,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      user: { _id },
    } = this.props.auth;
    if (!_id) return null;

    const {
      imgFileName,
      brand,
      trailer_type,
      deck_dimensions,
      weight,
      price,
      trailer_address,
      trailer_city,
      trailer_zip,
      trailer_state,
    } = this.state;

    const newTrailer = {
      image_original: imgFileName,
      brand,
      trailer_type,
      deck_dimensions,
      weight,
      price,
      owner_id: _id,
      trailer_address,
      trailer_city,
      trailer_zip,
      trailer_state,
    };
    this.props.addItem(newTrailer);

    // window.location.href = '/success';
  };

  render() {
    console.log(this.props);
    const {
      activeStep,
      brand,
      trailer_type,
      deck_dimensions,
      weight,
      price,
      trailer_address,
      trailer_city,
      trailer_zip,
      trailer_state,
    } = this.state;

    const {
      classes,
      auth: { user, isLoading },
    } = this.props;

    if (!user) {
      return <LoadingSpinner loading={isLoading} />;
    } else {
      return (
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Container>
            {activeStep === steps.length ? (
              <Container maxWidth='md'>
                <TrailerReviewDisplay
                  brand={brand}
                  trailer_type={trailer_type}
                  deck_dimensions={deck_dimensions}
                  weight={weight}
                  price={price}
                  trailer_address={trailer_address}
                  trailer_city={trailer_city}
                  trailer_state={trailer_state}
                  trailer_zip={trailer_zip}
                />
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                >
                  <Button
                    variant='outlined'
                    color='primary'
                    className={classes.backButton}
                    onClick={this.handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={this.handleSubmit}
                  >
                    Add Listing
                  </Button>
                </Grid>
              </Container>
            ) : (
              <Container maxWidth='md'>
                {this.getStepContent(activeStep)}
              </Container>
            )}
          </Container>
        </div>
      );
    }
  }
}
AddListingForm.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
  image: state.image,
});
export default connect(mapStateToProps, {
  loadUser,
  addItem,
  addImage,
  getImages,
})(withStyles(styles)(AddListingForm));

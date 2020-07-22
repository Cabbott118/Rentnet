import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
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
  return ['Trailer Information', 'Pick Up & Drop Off'];
}

const steps = getSteps();

export class AddListingForm extends Component {
  state = {
    activeStep: 0,
    prevStep: null,
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
          <TrailerInformation
            handleChange={this.handleChange}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            activeStep={stepIndex}
            values={values}
          />
        );
      case 1:
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

    window.location.href = '/success';
  };

  render() {
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
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});
export default connect(mapStateToProps, { loadUser, addItem })(
  withStyles(styles)(AddListingForm)
);

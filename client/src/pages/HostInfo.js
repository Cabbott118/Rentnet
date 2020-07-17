import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import HostPersonalInfo from '../components/HostPersonalInfo';
import HostPaymentInfo from '../components/HostPaymentInfo';
import HostTerms from '../components/HostTerms';
import HostReviewDisplay from '../components/HostReviewDisplay';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { loadUser, editUser } from '../redux/actions/authActions';

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
  return ['Personal Information', 'Payment Information', 'Terms & Conditions'];
}

const steps = getSteps();

export class HostInfo extends Component {
  state = {
    activeStep: 0,
    prevStep: null,
    userAddress: '',
    userCity: '',
    userState: '',
    userZip: '',
    userPhone: '',
    userBankName: '',
    userAccountNumber: '',
    userRoutingNumber: '',
    userAgreed: false,
  };

  getStepContent(stepIndex) {
    const {
      userAddress,
      userCity,
      userState,
      userZip,
      userPhone,
      userBankName,
      userAccountNumber,
      userRoutingNumber,
      userAgreed,
    } = this.state;

    const values = {
      userAddress,
      userCity,
      userState,
      userZip,
      userPhone,

      userBankName,
      userAccountNumber,
      userRoutingNumber,
      userAgreed,
    };
    switch (stepIndex) {
      case 0:
        return (
          <HostPersonalInfo
            handleChange={this.handleChange}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            activeStep={stepIndex}
            values={values}
          />
        );
      case 1:
        return (
          <HostPaymentInfo
            handleChange={this.handleChange}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            activeStep={stepIndex}
            values={values}
          />
        );
      case 2:
        return (
          <HostTerms
            handleBack={this.handleBack}
            handleNext={this.handleAgreed}
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

  handleAgreed = () => {
    const { prevStep, activeStep } = this.state;
    this.setState({
      prevStep: prevStep + 1,
      activeStep: activeStep + 1,
      userAgreed: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      user: { _id },
    } = this.props.auth;
    if (!_id) return null;

    const {
      userAddress,
      userCity,
      userState,
      userZip,
      userPhone,

      userBankName,
      userAccountNumber,
      userRoutingNumber,
      userAgreed,
    } = this.state;

    const updatedUser = {
      id: _id,
      userAddress,
      userCity,
      userState,
      userZip,
      userPhone,

      userBankName,
      userAccountNumber,
      userRoutingNumber,
      userAgreed,
      is_host: true,
    };
    this.props.editUser(updatedUser);
    window.location.href = '/account';
  };

  render() {
    const {
      activeStep,
      userAddress,
      userCity,
      userState,
      userZip,
      userPhone,

      userBankName,
      userAccountNumber,
      userRoutingNumber,
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
                <HostReviewDisplay
                  userAddress={userAddress}
                  userCity={userCity}
                  userState={userState}
                  userZip={userZip}
                  userPhone={userPhone}
                  userBankName={userBankName}
                  userAccountNumber={userAccountNumber}
                  userRoutingNumber={userRoutingNumber}
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
                    Confirm and Update
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

HostInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, editUser })(
  withStyles(styles)(HostInfo)
);

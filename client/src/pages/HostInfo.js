import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import HostPersonalInfo from '../components/HostPersonalInfo';
import HostPaymentInfo from '../components/HostPaymentInfo';
import HostTerms from '../components/HostTerms';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

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
    userBankName: '',
    userAccountNumber: '',
    userRoutingNumber: '',
  };

  getStepContent(stepIndex) {
    const {
      userAddress,
      userCity,
      userState,
      userZip,
      userBankName,
      userAccountNumber,
      userRoutingNumber,
    } = this.state;
    const values = {
      userAddress,
      userCity,
      userState,
      userZip,
      userBankName,
      userAccountNumber,
      userRoutingNumber,
    };
    switch (stepIndex) {
      case 0:
        return (
          <HostPersonalInfo handleChange={this.handleChange} values={values} />
        );
      case 1:
        return (
          <HostPaymentInfo handleChange={this.handleChange} values={values} />
        );
      case 2:
        return <HostTerms />;
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

  handleReset = () => {
    this.setState({
      activeStep: 0,
      prevStep: null,
    });
  };

  console = () => {
    console.log(this.state);
  };

  render() {
    const {
      activeStep,
      userAddress,
      userCity,
      userState,
      userZip,
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
                <Typography align='center'>
                  Please review your updated information before continuing.
                </Typography>
                <Typography variant='h6' align='center'>
                  Address:
                </Typography>
                <Typography variant='body1' align='center'>
                  {userAddress}
                </Typography>

                <Typography variant='body1' align='center'>
                  {userCity}, {userState} {userZip}
                </Typography>

                <Typography variant='h6' align='center'>
                  Banking Information:
                </Typography>
                <Typography variant='body1' align='center'>
                  {userBankName}
                </Typography>
                <Typography variant='body1' align='center'>
                  {userAccountNumber}
                </Typography>
                <Typography variant='body1' align='center'>
                  {userRoutingNumber}
                </Typography>
                <Button
                  variant='outlined'
                  color='primary'
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
              </Container>
            ) : (
              <Container maxWidth='md'>
                {this.getStepContent(activeStep)}
                <div className={classes.buttonGroup}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                    variant='outlined'
                    color='primary'
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Continue' : 'Next'}
                  </Button>
                </div>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(
  withStyles(styles)(HostInfo)
);

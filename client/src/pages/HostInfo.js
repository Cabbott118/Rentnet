import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';

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
  // instructions: {
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(1),
  // },
});

function getSteps() {
  return ['Step One', 'Step Two', 'Step Three'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return groupOne;
    case 1:
      return (
        <Container>
          <TextField label='Thing 4' fullWidth />
          <TextField label='Thing 5' fullWidth />
          <TextField label='Thing 6' fullWidth />
        </Container>
      );
    case 2:
      return (
        <Container>
          <TextField label='Thing 7' fullWidth />
          <TextField label='Thing 8' fullWidth />
          <TextField label='Thing 9' fullWidth />
        </Container>
      );
    default:
      return 'Unknown stepIndex';
  }
}

const groupOne = (
  <Container>
    <TextField label='Thing 1' name='inputOne' fullWidth />
    <TextField label='Thing 2' fullWidth />
    <TextField label='Thing 3' fullWidth />
  </Container>
);

const steps = getSteps();

export class HostInfo extends Component {
  state = {
    activeStep: 0,
    prevStep: null,
    inputOne: '',
  };

  componentDidMount() {
    this.props.loadUser();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    console.log(this.state);
    const { activeStep } = this.state;

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
              <div>
                <Typography className={classes.instructions}>
                  All steps completed, ready for review
                </Typography>
                <Button className={classes.button} onClick={this.handleReset}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
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
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
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

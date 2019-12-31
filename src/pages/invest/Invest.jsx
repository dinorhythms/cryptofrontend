import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Pricing from './Pricing';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { serverRequest } from '../../utils/serverRequest';
import { SET_ERROR } from '../../store/types/notificationTypes';
import { INVEST, CLEAR_INVEST, INVEST_ERROR } from '../../store/types/investTypes';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Plan', 'Amount', 'Review'];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Pricing />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Invest() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  // const [investmentId, setInvestmentId] = React.useState();

  const dispatch = useDispatch();
  const { selectedPlan, amount, status } = useSelector(state => state.invest);
  const { user: { token } } = useSelector(state => state.auth);

  const handleNext = async () => {
    if(activeStep === steps.length - 1){
      try {
        dispatch({ type: INVEST });
        const endpoint = '/investments';
        await serverRequest(token).post(endpoint, {planId: selectedPlan.id, amount});
        // setInvestmentId(response.data.data.investment.id)
        setActiveStep(activeStep + 1);
        dispatch({ type: CLEAR_INVEST });
      } catch (error) {
        dispatch({ type: INVEST_ERROR });
        dispatch({ type: SET_ERROR, payload: error });
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Invest
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your Investment placement.
                </Typography>
                <Typography variant="subtitle1">
                  Your investment was successful. Check the investment details <Link to={`/investments`}>here</Link> with payment details for confirmation.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={status === "loading"}
                  >
                    {activeStep === steps.length - 1 ? 'Place Investment' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

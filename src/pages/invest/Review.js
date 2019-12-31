import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  const { selectedPlan, amount, profit, total } = useSelector(state => state.invest);

  if(!selectedPlan || !amount){
    return (
      <React.Fragment>
        <Typography variant="h6" style={{textAlign: 'center'}} gutterBottom>
          Investment summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <h3 style={{textAlign: 'center'}}>You need to pick a plan and amount</h3>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Typography variant="h6" style={{textAlign: 'center'}} gutterBottom>
        Investment Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Plan
          </Typography>
          <Typography gutterBottom>Name: {selectedPlan.name}</Typography>
          <Typography gutterBottom>Description: {selectedPlan.description}</Typography>
          <Typography gutterBottom>Percentage: {selectedPlan.percentage}%</Typography>
          <Typography gutterBottom>Days: {selectedPlan.investmentTime}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Amount
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={12}>
                <Typography gutterBottom>Investment: ${amount}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Investment Profit: ${profit}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Investment Total: ${total}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

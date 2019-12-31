import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_AMOUNT } from '../../store/types/investTypes';

export default function PaymentForm() {

  const [error, setErrror] = useState(false);
  const dispatch = useDispatch();
  const { selectedPlan, amount, profit, total } = useSelector(state => state.invest);

  if(!selectedPlan){
    return (
      <React.Fragment>
        <Typography variant="h6" style={{textAlign: 'center'}} gutterBottom>
          Amount
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <h3 style={{textAlign: 'center'}}>You need to pick a plan first</h3>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  const handleAmountProcess = (e) => {
    const amount = e.target.value;
    if(+amount < +selectedPlan.minimum || +amount > +selectedPlan.maximum){
      setErrror(true)
    } else {
      setErrror(false)
      const profit = ((+amount * +selectedPlan.percentage) / 100 - +amount).toFixed(2);
		  const total = ((+amount * +selectedPlan.percentage) / 100).toFixed(2);
      dispatch({ type: ADD_AMOUNT, payload: { amount, profit, total } });
    }
    
  }

  return (
    <React.Fragment>
      <Typography variant="h6" style={{textAlign: 'center'}} gutterBottom>
        Amount
      </Typography>
      <p style={{textAlign: 'center'}}>minimum: {selectedPlan.minimum} - maximum: {selectedPlan.maximum}</p>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField disabled variant="outlined" required id="plan" label={`Selected Plan: ${selectedPlan.name} @ ${selectedPlan.percentage}% for ${selectedPlan.investmentTime} days`} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            error={error}
            required 
            id="cardNumber" 
            onChange={(e)=>handleAmountProcess(e)}  
            helperText={error?`min: ${selectedPlan.minimum} - max: ${selectedPlan.maximum}`:null} 
            label={`Insert Amount: $${amount}`} 
            variant="outlined"
            fullWidth 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" disabled required id="expDate" label={`Profit: $${profit}`} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField variant="outlined" disabled required id="cvv" label={`Total: $${total}`} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

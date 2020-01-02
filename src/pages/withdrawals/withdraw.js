import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { serverRequest } from '../../utils/serverRequest';
import Skeleton from 'react-loading-skeleton';
import Typography from '@material-ui/core/Typography';


import { SET_ERROR, SET_SUCCESS } from '../../store/types/notificationTypes';
import { currencyFormat } from '../../utils/helpers';
import { WITHDRAWAL_FETCH, WITHDRAWALS_CANCEL } from '../../store/types/withdrawalsTypes';
import { WALLET_FETCH, WALLET_RESOLVE } from '../../store/types/walletTypes';

const useStyles = makeStyles(theme => ({
  count: {
    textAlign: 'center',
    width: '100%'
  },
  countdown: {
    fontSize: '2rem',
    marginBottom: '20px'
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    minWidth: 275,
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
  },
  fixedHeight: {
    height: 240,
  },
  profitBar: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  }
}));

export default function Withdraw({history, match}) {
  const classes = useStyles();

  const [error, setErrror] = useState(false);
  const [amount, setAmount] = useState(0);
  const [min, setMin] = useState(1000.00);
  const [bankName, setBankName] = useState(1000.00);
  const [accountName, setAccountName] = useState();
  const [accountNo, setAccountNo] = useState();

  const { user: { token } } = useSelector(state => state.auth);
  const { wallet, status } = useSelector(state => state.wallet);

  const dispatch = useDispatch();
  
  if(status === 'idle' || status === 'loading'){
    return <Skeleton count={5} />
  }

  const handleAmountProcess = (e) => {
    const amount = e.target.value;
    if(+amount < +min || +amount > +wallet.balance){
      setErrror(true)
    } else {
      setErrror(false)
      setAmount(+e.target.value)
    }
  }

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: WITHDRAWAL_FETCH });
      const endpoint = '/withdrawals';
      await serverRequest(token).post(endpoint, {amount, bankName, accountName, accountNo});
      dispatch({ type: WITHDRAWALS_CANCEL });
      dispatch({ type: WALLET_FETCH });
      const response = await serverRequest(token).get('/wallet');
      console.log()
      dispatch({ type: WALLET_RESOLVE, payload:response.data.data.wallet})
      dispatch({ type: SET_SUCCESS, payload: "Successful, withdrawal added" });
      history.push('/withdrawals');
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error });
      dispatch({ type: WITHDRAWALS_CANCEL });
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h5" style={{textAlign: 'center'}} gutterBottom>
        Withdraw
      </Typography>
      <p style={{textAlign: 'center'}}>minimum: {currencyFormat(min)} - maximum: {currencyFormat(wallet.balance)}</p>
      <form className={classes.form} onSubmit={handleWithdraw}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
              error={error}
              required
              id="amount" 
              onChange={(e)=>handleAmountProcess(e)}  
              helperText={error?"Out of range":null} 
              label={`Insert Amount: $${amount}`} 
              variant="outlined"
              fullWidth 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField variant="outlined" onChange={(e) => setBankName(e.target.value)} required id="Bank Name" label="Bank Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField variant="outlined" onChange={(e) => setAccountName(e.target.value)} required id="Account Name" label="Account Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField variant="outlined" onChange={(e) => setAccountNo(e.target.value)} required id="Account Number" label="Account Number" fullWidth />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={status === 'loading' || error}
              >
                {status === 'loading'?"Loading...":"Submit"}
              </Button>
            </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { serverRequest } from '../utils/serverRequest';
import Skeleton from 'react-loading-skeleton';

import { SET_ERROR } from '../store/types/notificationTypes';
import { currencyFormat, formatDate } from '../utils/helpers';
import { WALLET_RESOLVE, WALLET_FETCH } from '../store/types/walletTypes';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    fontSize: '12px',
    marginBottom: '10px'
  },
  amount: {
    marginBottom: '20px',
    marginTop: '20px'
  }
});

const Wallet = () => {
  const classes = useStyles();
  const { user: { token } } = useSelector(state => state.auth);
  const { wallet, status } = useSelector(state => state.wallet);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: WALLET_FETCH });
        const response = await serverRequest(token).get('/wallet');
        dispatch({ type: WALLET_RESOLVE, payload:response.data.data.wallet})
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
      }
    }
    getData();
  }, [token, dispatch])
  
  if((status === 'idle' || status === 'loading') && !wallet){
    return <Skeleton count={5} />
  }

  return (
    <React.Fragment>
      <div style={{textAlign: 'center'}}>
        <Title>Wallet</Title>
        <small>Oladehinde Kazeem</small>
        <Typography component="p" variant="h4" className={classes.amount}>
          { currencyFormat(wallet.balance) }
        </Typography>
        <small style={{color:'blue'}}>Last Update</small>
        <Typography color="textSecondary" className={classes.depositContext}>
         { formatDate(wallet.updatedAt) }
        </Typography>
        <div>
          <Link to="/investments" color="primary">
            View Transactions
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Wallet;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { serverRequest } from '../../utils/serverRequest';
import Skeleton from 'react-loading-skeleton';

import { SET_ERROR } from '../../store/types/notificationTypes';
import { currencyFormat, formatDate } from '../../utils/helpers';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    fontSize: '12px',
    marginBottom: '10px'
  },
  amount: {
    marginBottom: '30px',
    marginTop: '30px'
  }
});

const Wallet = () => {
  const classes = useStyles();
  const { user: { token } } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await serverRequest(token).get('/wallet');
        setWallet(response.data.data.wallet);
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.response.data.error });
      }
    }
    getData();
  }, [token, dispatch])
  
  if(!wallet){
    return <Skeleton count={5} />
  }

  return (
    <React.Fragment>
      <div style={{textAlign: 'center'}}>
        <Title>Wallet</Title>
        <Typography component="p" variant="h4" className={classes.amount}>
          { currencyFormat(wallet.balance) }
        </Typography>
        <small style={{color:'blue'}}>Last Update</small>
        <Typography color="textSecondary" className={classes.depositContext}>
         { formatDate(wallet.updatedAt) }
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View Transactions
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Wallet;

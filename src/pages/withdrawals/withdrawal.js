import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from '../../components/Title';
import { serverRequest } from '../../utils/serverRequest';
import Skeleton from 'react-loading-skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';

import { SET_ERROR } from '../../store/types/notificationTypes';
import { currencyFormat, formatDate } from '../../utils/helpers';
import { WITHDRAWAL_FETCH, WITHDRAWAL_RESOLVE } from '../../store/types/withdrawalsTypes';

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

export default function Withdrawal({history, match}) {
  const classes = useStyles();
  const { user: { token } } = useSelector(state => state.auth);
  const { withdrawal, status } = useSelector(state => state.withdrawal);
  const { withdrawalId } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: WITHDRAWAL_FETCH });
        const response = await serverRequest(token).get(`/withdrawals/${withdrawalId}`);
        dispatch({ type: WITHDRAWAL_RESOLVE, payload: response.data.data.withdrawal})
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
      }
    }
    getData();
  }, [token, dispatch, withdrawalId])
  
  if(status === 'idle' || status === 'loading'){
    return <Skeleton count={5} />
  }

  const confirmation = (status, endTime) => {
    if(status === 'pending') return "Pending Confirmation";
    if(status === 'settled') return "Withdrawal Settled";
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Title><NavLink to="/withdrawals">Back</NavLink> | Withdrawal</Title>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Amount
                </Typography>
                <Typography variant="h5" component="h2">
                  {currencyFormat(+withdrawal.amount)}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  
                </Typography>
                <Typography variant="body2" component="p" style={{marginTop: '15px'}}>
                  Requested amount.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} className={classes.count}>
            <h5>Withdrawal Status</h5>
            <div className={classes.countdown}>
              {confirmation(withdrawal.status, withdrawal.endTime)}
            </div>
            <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Account Nnumber</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow hover>
                <TableCell>{formatDate(withdrawal.createdAt)}</TableCell>
                <TableCell>{withdrawal.bankName}</TableCell>
                <TableCell>{withdrawal.accountName}</TableCell>
                <TableCell>{withdrawal.accountNo}</TableCell>
                <TableCell style={{textTransform: 'capitalize'}}>{withdrawal.status}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
          </Grid>
        </Grid>
      </Paper>
      </Grid>
    </Grid>
  );
}

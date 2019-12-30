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
import Countdown from 'react-countdown-now';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';

import { SET_ERROR } from '../../store/types/notificationTypes';
import { currencyFormat, formatDate } from '../../utils/helpers';
import { INVESTMENT_FETCH, INVESTMENT_RESOLVE } from '../../store/types/investmentTypes';

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

export default function Investment({history, match}) {
  const classes = useStyles();
  const { user: { token } } = useSelector(state => state.auth);
  const { investment, status } = useSelector(state => state.investment);
  const { investmentId } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: INVESTMENT_FETCH });
        const response = await serverRequest(token).get(`/investments/${investmentId}`);
        dispatch({ type: INVESTMENT_RESOLVE, payload: response.data.data.investment})
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
      }
    }
    getData();
  }, [token, dispatch, investmentId])
  
  if(status === 'idle' || status === 'loading'){
    return <Skeleton count={5} />
  }

  const confirmation = (status, endTime) => {
    if(status === 'pending') return "Pending Confirmation";
    if(status === 'settled') return "Investment Settled";
    console.log('Date check: ', status)
    return <Countdown date={endTime} />
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Title><NavLink to="/investments">Back</NavLink> | Investment</Title>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Amount
                </Typography>
                <Typography variant="h5" component="h2">
                  {currencyFormat(+investment.amount)}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  
                </Typography>
                <Typography variant="body2" component="p" style={{marginTop: '15px'}}>
                  Initial deposit on investment.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Total
                </Typography>
                <Typography variant="h5" component="h2">
                  {currencyFormat(+investment.total)}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  
                </Typography>
                <Typography variant="body2" component="p" style={{marginTop: '15px'}}>
                  Total income on investment.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Profit
                </Typography>
                <Typography variant="h5" component="h2">
                  {currencyFormat(+investment.profit)}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  
                </Typography>
                <Typography variant="body2" component="p" style={{marginTop: '15px'}}>
                  Your profit on investment.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} className={classes.count}>
            <h5>Cashout Time</h5>
            <div className={classes.countdown}>
              {confirmation(investment.status, investment.endTime)}
            </div>
            {investment.status === 'pending'?(<p>Pay to: {investment.payToAccount.accountNo} to get confirmed.</p>):null}
            <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Cashout</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow hover>
                <TableCell>{formatDate(investment.createdAt)}</TableCell>
                <TableCell>{formatDate(investment.startTime)}</TableCell>
                <TableCell>{formatDate(investment.endTime)}</TableCell>
                <TableCell style={{textTransform: 'capitalize'}}>{investment.status}</TableCell>
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

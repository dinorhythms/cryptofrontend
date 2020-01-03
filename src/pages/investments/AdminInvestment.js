import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import Countdown from 'react-countdown-now';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Title from '../../components/Title';
import { INVESTMENT_FETCH, INVESTMENT_RESOLVE, INVESTMENT_CANCEL } from '../../store/types/investmentTypes';
import { SET_ERROR, SET_SUCCESS } from '../../store/types/notificationTypes';
import { currencyFormat, formatDate } from '../../utils/helpers';
import { serverRequest } from '../../utils/serverRequest';
import Button from '@material-ui/core/Button';


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
  },
  button: {
    marginBottom: '20px'
  }
}));

export default function AdminInvestment({history, match}) {
  const classes = useStyles();
  const { user: { token } } = useSelector(state => state.auth);
  const { investment, status } = useSelector(state => state.investment);
  const { investmentId } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: INVESTMENT_FETCH });
        const response = await serverRequest(token).get(`/admin/investments/${investmentId}`);
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
    return <Countdown date={endTime} />
  }

  const handleAdminConfirmation = async() => {
    try {
      dispatch({ type: INVESTMENT_FETCH });
      await serverRequest(token).post(`/admin/investments/${investmentId}`);
      dispatch({ type: INVESTMENT_CANCEL });
      dispatch({ type: SET_SUCCESS, payload: "Successful, investment confirmed!" });
      history.push('/admin/investments')
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error });
    }
  }
  
  const handleAdminSettle = async() => {
    try {
      dispatch({ type: INVESTMENT_FETCH });
      await serverRequest(token).post(`/admin/investments/${investmentId}/settle`);
      dispatch({ type: INVESTMENT_CANCEL });
      dispatch({ type: SET_SUCCESS, payload: "Successful, investment settled!" });
      history.push('/admin/investments')
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error });
    }
  }
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Title><NavLink to="/admin/investments">Back</NavLink> | Investment</Title>
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
            {investment.endTime <= new Date().toISOString()?(
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={status === "loading"}
                onClick={handleAdminSettle}
              >
                {status === 'loading'?"Loading...":"SETTLE"}
              </Button>
            </div>):null}
            {investment.status === 'pending'?(
            <div>
              <p>
                User to: {investment.payToAccount.accountNo} to get confirmed.
              </p>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={status === "loading"}
                onClick={handleAdminConfirmation}
              >
                {status === 'loading'?"Loading...":"CONFIRM"}
              </Button>
            </div>):null}
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

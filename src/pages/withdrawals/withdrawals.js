import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';
import { serverRequest } from '../../utils/serverRequest';
import Skeleton from 'react-loading-skeleton';

import { SET_ERROR } from '../../store/types/notificationTypes';
import { currencyFormat, formatDate } from '../../utils/helpers';
import { WITHDRAWALS_FETCH, WITHDRAWALS_RESOLVE } from '../../store/types/withdrawalsTypes';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  tablerow: {
    cursor: 'pointer'
  }
}));

export default function Withdrawals({history}) {
  const classes = useStyles();
  const { user: { token } } = useSelector(state => state.auth);
  const { withdrawals, status } = useSelector(state => state.withdrawals);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: WITHDRAWALS_FETCH });
        const response = await serverRequest(token).get('/withdrawals');
        dispatch({ type: WITHDRAWALS_RESOLVE, payload: response.data.data.withdrawals})
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
      }
    }
    getData();
  }, [token, dispatch])
  
  if(status === 'idle' || status === 'loading'){
    return <Skeleton count={5} />
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Title>Recent Withdrawals</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawals.length > 0?null:(
              <TableRow className={classes.tablerow}>
                <TableCell colSpan={7}>NO RECORD</TableCell>
              </TableRow>
            )}
            {withdrawals.map(row => (
              <TableRow key={row.id} hover onClick={() => history.push(`/withdrawals/${row.id}`)} className={classes.tablerow}>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{currencyFormat(+row.amount)}</TableCell>
                <TableCell>{row.bankName}</TableCell>
                <TableCell>{row.accountName}</TableCell>
                <TableCell>{row.accountNo}</TableCell>
                <TableCell style={{textTransform: 'capitalize'}}>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

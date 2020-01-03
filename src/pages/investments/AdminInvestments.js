import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title';
import { INVESTMENTS_FETCH, INVESTMENTS_RESOLVE } from '../../store/types/investmentTypes';
import { SET_ERROR } from '../../store/types/notificationTypes';
import { currencyFormat, formatDate } from '../../utils/helpers';
import { serverRequest } from '../../utils/serverRequest';


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

export default function AdminInvestments({history, limit=1000}) {
  const classes = useStyles();
  const { user: { token } } = useSelector(state => state.auth);
  const { investments, status } = useSelector(state => state.investments);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: INVESTMENTS_FETCH });
        const response = await serverRequest(token).get('/admin/investments');
        dispatch({ type: INVESTMENTS_RESOLVE, payload: response.data.data.investments})
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
        <Title>Investments</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Cashout</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Profit</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investments.length > 0?null:(
                <TableRow className={classes.tablerow}>
                  <TableCell colSpan={7}>NO RECORD</TableCell>
                </TableRow>
            )}
            {investments.slice(0, limit).map(row => (
              <TableRow key={row.id} hover onClick={() => history.push(`/admin/investments/${row.id}`)} className={classes.tablerow}>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{formatDate(row.startTime)}</TableCell>
                <TableCell>{formatDate(row.endTime)}</TableCell>
                <TableCell>{currencyFormat(+row.amount)}</TableCell>
                <TableCell>{currencyFormat(+row.profit)}</TableCell>
                <TableCell>{currencyFormat(+row.total)}</TableCell>
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

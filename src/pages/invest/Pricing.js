import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { PLANS_FETCH, PLANS_RESOLVE } from '../../store/types/plansTypes';
import { SET_ERROR } from '../../store/types/notificationTypes';
import { serverRequest } from '../../utils/serverRequest';
import Skeleton from 'react-loading-skeleton';
import { currencyFormat } from '../../utils/helpers';
import { ADD_PLAN } from '../../store/types/investTypes';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    // margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    // padding: theme.spacing(8, 0, 6),
  },
  CardContent: {
    cursor: 'pointer',
  },
  active: {
    cursor: 'pointer',
    backgroundColor: '#7fc7ff'
  },
  p: {
    textAlign: 'center',
    marginBottom: '25px'
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    // marginBottom: theme.spacing(2),
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user: { token } } = useSelector(state => state.auth);
  const {plans, status } = useSelector(state => state.plans);
  const { selectedPlan } = useSelector(state => state.invest);
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: PLANS_FETCH });
        const response = await serverRequest(token).get(`/plans/`);
        dispatch({ type: PLANS_RESOLVE, payload: response.data.data.plans})
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error });
      }
    }
    getData();
  }, [token, dispatch])

  if(status === 'idle' || status === 'loading'){
    return <Skeleton count={10} />
  }

  const handlePlanSelection = (e, plan) => {
    dispatch({ type: ADD_PLAN, payload: plan });
  }

  return (
    <React.Fragment>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
          Plans
        </Typography>
        <p className={classes.p}>Pick a plan to start investment.</p>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {plans.map(plan => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={plan.id} xs={12} sm={plan.name === 'Expert' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={plan.name}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={plan.name === 'Expert' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent className={selectedPlan && (selectedPlan.id === plan.id)?classes.active:classes.CardContent} onClick={(e)=>handlePlanSelection(e, plan)}>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {plan.percentage}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /%
                    </Typography>
                  </div>
                  <ul>
                    <Typography component="li" variant="subtitle1" align="center">
                      {plan.investmentTime} Days
                    </Typography>
                    <Typography component="li" variant="subtitle1" align="center">
                      Minimum of {currencyFormat(+plan.minimum)}
                    </Typography>
                    <Typography component="li" variant="subtitle1" align="center">
                      Maximum of {currencyFormat(+plan.maximum)}
                    </Typography>
                    <Typography component="li" variant="subtitle1" align="center">
                      <small>{plan.description}</small>
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={plan.buttonVariant} color="primary" onClick={(e)=>handlePlanSelection(e, plan)}>
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

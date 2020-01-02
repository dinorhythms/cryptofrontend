import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useDispatch, useSelector } from 'react-redux';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { AUTH_FETCH, AUTH_RESOLVE, AUTH_REJECT } from '../../store/types/authTypes';
import { serverRequest } from '../../utils/serverRequest';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notification: {
    marginBottom: '20px',
    backgroundColor: 'red'
  }
}));

export default function SignIn({history}) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: AUTH_FETCH});
      const endpoint = '/auth/signin';
      const response = await serverRequest().post(endpoint, {email, password});
      if(response.data.status === 'success'){
        dispatch({ type: AUTH_RESOLVE, payload: response.data.data });
        history.push('/dashboard');
      } 
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        dispatch({ type: AUTH_REJECT, payload: error.response.data.error });
      } else if (error.request) {
        // The request was made but no response was received
        dispatch({ type: AUTH_REJECT, payload: "Something went wrong, please try again" });
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({ type: AUTH_REJECT, payload: "Something went wrong, please try again" });
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={status === 'loading'}
          >
            {status === 'loading'?"Loading...":"Sign In"}
          </Button>
          {error?(
            <SnackbarContent className={classes.notification} message={typeof error === 'object'?(
              Object.keys(error).map( key =><p key={key}>{error[key]}</p>)
            ):error} />
          ):null}
          <Grid container>
            <Grid item sm style={{textAlign: "center"}}>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

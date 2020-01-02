import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_FETCH, AUTH_REJECT, AUTH_CANCEL } from '../../store/types/authTypes';
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
  },
  notification2: {
    marginBottom: '20px',
    backgroundColor: 'green',
  }
}));

export default function SignUp({history}) {
  const classes = useStyles();
  const [message, setMessage] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipCode] = useState('');
  const { error, status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        email,
        password,
        firstname,
        lastname,
        phone,
        address,
        state,
        country,
        zipcode
      }
      dispatch({ type: AUTH_CANCEL })
      dispatch({ type: AUTH_FETCH});
      const endpoint = '/auth/signup';
      const response = await serverRequest().post(endpoint, data);
      if(response.data.status === 'success'){
        setMessage("Signup was Successful");
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

  useEffect(() => {
    dispatch({ type: AUTH_CANCEL })
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number with +97..."
                name="phone"
                autoComplete="phone"
                autoFocus
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                autoFocus
                onChange={e => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                autoFocus
                onChange={e => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="zipcode"
                label="Zipcode"
                name="zipcode"
                autoComplete="zipcode"
                autoFocus
                onChange={e => setZipCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Full Address"
                name="address"
                autoComplete="address"
                autoFocus
                onChange={e => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={status === 'loading'}
              >
                {status === 'loading'?"Loading...":"SignUp"}
              </Button>
              {error?(
                <SnackbarContent className={classes.notification} message={typeof error === 'object'?(
                  Object.keys(error).map( key =><p key={key}>{error[key]}</p>)
                ):error} />
              ):null}
              {message?(
                <SnackbarContent className={classes.notification2} message={<p>Signup was Successful, login <Link style={{color:"white"}} to="/login">here</Link></p>} />
              ):null}
            </Grid>
            <Grid container>
              <Grid item sm style={{textAlign: "center"}}>
                <Link to="/login" href="#" variant="body2">
                  {"Have an account? Signin"}
                </Link>
              </Grid>
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

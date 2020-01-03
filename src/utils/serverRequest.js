import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { store } from '../store';
import { TOKEN_REFRESH } from '../store/types/authTypes';

export const serverRequest = (token=null) => {

  const axiosInst = axios.create({
    baseURL: 'https://us-central1-cryptofox.cloudfunctions.net/api/v1',
    // timeout: 8000,
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
     'Authorization': `Bearer ${token}`,
    }
  });

  axiosInst.interceptors.request.use(async function(config) {

    const state = store.getState();

    if(state.auth.user){
      const token = state.auth.user.token;
      const refreshToken = state.auth.user.refreshToken;
  
      const decoded = jwtDecode(token);
      if(decoded.exp < Date.now() / 1000){
        try {
          const apiKey = process.env.REACT_APP_API_KEY;
          const url = `https://securetoken.googleapis.com/v1/token?key=${apiKey}&grant_type=refresh_token&refresh_token=${refreshToken}`;
          const data = await axios.post(url);
          store.dispatch({ type: TOKEN_REFRESH, payload: { token: data.data.access_token, refreshToken: data.data.refresh_token } })
          config.headers.Authorization = `Bearer ${data.data.access_token}`
        } catch (error) {
          console.log(error)
        }
      } 
    }
    // console.log(decoded);
    // console.log('request => config ====================================');
    // console.log(config);
    // console.log('request => config ====================================');
    // if u add new Chainable promise or other interceptor
    // You have to return `config` inside of a rquest
    // otherwise u will get a very confusing error
    // and spend sometime to debug it.
    return config;
  }, function(error) {
    return Promise.reject(error);
  });

  return axiosInst;

}

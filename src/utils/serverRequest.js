import axios from 'axios';

export const serverRequest = (token=null) => {
  return axios.create({
    baseURL: 'https://us-central1-cryptofox.cloudfunctions.net/api/v1',
    timeout: 5000,
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
     'Authorization': `Bearer ${token}`,
    }
  });
}
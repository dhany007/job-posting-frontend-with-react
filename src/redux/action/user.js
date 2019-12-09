import axios from 'axios';

const IP = 'https://freejobpost.site';

export const login = data => {
  return {
    type: 'LOGIN_USER',
    payload: axios.post(`${IP}/auth/login`, data),
  }
}

export const register = data => {
  return {
    type: 'REGISTER_USER',
    payload: axios.post(`${IP}/auth/register`, data),

  }
}
import axios from 'axios';

const IP = 'http://34.205.156.175:3001';

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
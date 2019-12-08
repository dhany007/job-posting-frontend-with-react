import axios from 'axios';

const IP = 'http://34.205.156.175:3001/company/';

export const getCompany = ()  => {
  return {
    type: 'GET_COMPANY',
    payload: axios.get(`${IP}`)
  }
}
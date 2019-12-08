import axios from 'axios';

const IP = 'http://34.205.156.175:3001/category/';

export const getCategory = ()  => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(`${IP}`)
  }
}
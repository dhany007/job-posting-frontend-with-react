import axios from 'axios';

const IP = 'https://freejobpost.site/category/';

export const getCategory = ()  => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(`${IP}`)
  }
}
import axios from 'axios';

const IP = 'http://34.205.156.175:3001/job';

export const getJob = query  => {
  return {
    type: 'GET_JOB',
    payload: axios.get(`${IP}?` + query)
  }
}
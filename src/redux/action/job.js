import axios from 'axios';

const IP = 'http://34.205.156.175:3001';

export const getJob = query  => {
  return {
    type: 'GET_JOB',
    payload: axios.get(`${IP}/job?` + query)
  }
}

export const getOneJob = id_job  => {
  return {
    type: 'GET_JOB',
    payload: axios.get(`${IP}/job/` + id_job)
  }
}
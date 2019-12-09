import axios from 'axios';

const IP = 'https://freejobpost.site/company/';

export const getCompany = ()  => {
  return {
    type: 'GET_COMPANY',
    payload: axios.get(`${IP}`)
  }
}

export const addCompany = (dataCompany, token) => {
  return {
    type: 'ADD_COMPANY',
    payload: axios({
      method: 'POST',
      url: IP,
      data: dataCompany,
      headers : {
        'content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token,
      }
    })
  }
}
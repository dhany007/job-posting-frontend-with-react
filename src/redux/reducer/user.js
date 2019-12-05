import {
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_REJECTED,
} from './../constant/actiontypes'

const initalState = {
  isLoading: false,
  isError: false,
  isLogged: false,
  data: [],
}

const user = (state = initalState, action) => {
  switch(action.type){
    case LOGIN_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogged: true,
        data: action.payload.data,
      };
    case LOGIN_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return {
        state,
      }
  }
}

export default user;

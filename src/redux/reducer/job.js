import {
  GET_JOB_PENDING,
  GET_JOB_FULFILLED,
  GET_JOB_REJECTED,
} from './../constant/actiontypes'

const initialState = {
  isLoading: false,
  isError: false,
  data: {},
}

const job = (state = initialState, action) => {
  switch(action.type){
    // get job
    case GET_JOB_PENDING:
      return {
        state,
        isLoading: true,
      };
    case GET_JOB_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_JOB_REJECTED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
        return {
          state,
        };
  }
}

export default job;

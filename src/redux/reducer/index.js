import {combineReducers} from 'redux'

import user from './user'
import job from './job'

const appReducer = combineReducers({
  user,
  job,
})

export default appReducer;

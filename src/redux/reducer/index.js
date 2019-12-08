import {combineReducers} from 'redux'

import user from './user';
import job from './job';
import category from './category';
import company from './company';

const appReducer = combineReducers({
  user,
  job,
  category,
  company,
})

export default appReducer;

import {combineReducers} from 'redux';

import engineers from './engineers';
import companies from './companies';
import auth from './auth';

const rootReducer = combineReducers({
  engineers,
  companies,
  auth,
});

export default rootReducer;

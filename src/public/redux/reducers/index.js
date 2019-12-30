import {combineReducers} from 'redux';

import engineers from './engineers';
import auth from './auth';

const rootReducer = combineReducers({
  engineers,
  auth,
});

export default rootReducer;

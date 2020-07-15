import {combineReducers} from 'redux';
import recommend from './recommend';
import ranking from './ranking';

export default combineReducers({
  recommend,
  ranking,
});

import {combineReducers} from 'redux';
import recommend from './recommend';
import ranking from './ranking';
import singer from './singer';

export default combineReducers({
  recommend,
  ranking,
  singer,
});

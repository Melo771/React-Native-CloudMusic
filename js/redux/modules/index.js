import {combineReducers} from 'redux';
import recommend from './recommend';
import ranking from './ranking';
import singer from './singer';
import playlist from './playlist';
import singerDetail from './singerDetail';

export default combineReducers({
  recommend,
  ranking,
  singer,
  playlist,
  singerDetail,
});

import produce from 'immer';
import {getRankListRequest} from '../../request';

const defaultState = {
  rankList: [],
  loading: true,
};

export const types = {
  CHANGE_RANK_LIST: 'ranking/CHANGE_RANK_LIST',
  CHANGE_LOADING: 'ranking/CHANGE_LOADING',
};

const changeRankList = data => ({
  type: types.CHANGE_RANK_LIST,
  data,
});
const changeLoading = data => ({
  type: types.CHANGE_LOADING,
  data,
});
//action creators
export const actions = {
  getRankList: () => {
    return dispatch => {
      getRankListRequest().then(data => {
        let list = data && data.list;
        dispatch(changeRankList(list));
        dispatch(changeLoading(false));
      });
    };
  },
};

const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_RANK_LIST:
        draft.rankList = action.data;
        break;
      case types.CHANGE_LOADING:
        draft.loading = action.data;
        break;
    }
  });

export default reducer;

// selectors
export const getRankList = state => {
  return state.ranking.rankList;
};
export const getLoading = state => {
  return state.ranking.loading;
};

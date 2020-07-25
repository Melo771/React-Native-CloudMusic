import produce from 'immer';
import {getPlayListDetailRequest} from '../../request';

const defaultState = {
  playListDetail: {},
  enterLoading: true,
};

export const types = {
  CHANGE_PLAY_LIST_DETAIL: 'playlist/CHANGE_PLAY_LIST_DETAIL',
  CHANGE_LOADING: 'playlist/CHANGE_LOADING',
};

const changePlayListDetail = data => ({
  type: types.CHANGE_PLAY_LIST_DETAIL,
  data,
});

//action creators
export const actions = {
  getPlayListDetail: id => {
    return dispatch => {
      getPlayListDetailRequest(id)
        .then(res => {
          let data = res.playlist;
          dispatch(changePlayListDetail(data));
          dispatch(actions.changeEnterLoading(false));
        })
        .catch(() => {
          console.log('获取歌单数据失败！');
        });
    };
  },
  changeEnterLoading: data => ({
    type: types.CHANGE_LOADING,
    data,
  }),
};

const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_PLAY_LIST_DETAIL:
        draft.playListDetail = action.data;
        break;
      case types.CHANGE_LOADING:
        draft.enterLoading = action.data;
        break;
    }
  });

export default reducer;

// selectors
export const getPlayListDetail = state => {
  return state.playlist.playListDetail;
};
export const getEnterLoading = state => {
  return state.playlist.enterLoading;
};

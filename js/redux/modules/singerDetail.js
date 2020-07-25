import produce from 'immer';
import {getSingerInfoRequest} from '../../request';

const defaultState = {
  singerDetail: {},
  songsOfSinger: [],
  enterLoading: true,
};

export const types = {
  CHANGE_SINGER_DETAIL: 'singerDetail/CHANGE_SINGER_DETAIL',
  CHANGE_SONGS_OF_SINGER: 'singerDetail/CHANGE_SONGS_OF_SINGER',
  CHANGE_LOADING: 'singerDetail/CHANGE_LOADING',
};

const changeSingerDetail = data => ({
  type: types.CHANGE_SINGER_DETAIL,
  data,
});
const changeSongs = data => ({
  type: types.CHANGE_SONGS_OF_SINGER,
  data,
});
//action creators
export const actions = {
  getSingerDetail: id => {
    return dispatch => {
      getSingerInfoRequest(id)
        .then(data => {
          dispatch(changeSingerDetail(data.artist));
          dispatch(changeSongs(data.hotSongs));
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
      case types.CHANGE_SINGER_DETAIL:
        draft.singerDetail = action.data;
        break;
      case types.CHANGE_SONGS_OF_SINGER:
        draft.songsOfSinger = action.data;
        break;
      case types.CHANGE_LOADING:
        draft.enterLoading = action.data;
        break;
    }
  });

export default reducer;

// selectors
export const getSingerDetail = state => {
  return state.singerDetail.singerDetail;
};
export const getSongsOfSinger = state => {
  return state.singerDetail.songsOfSinger;
};
export const getEnterLoading = state => {
  return state.singerDetail.enterLoading;
};

import produce from 'immer';
import {getSingerListRequest} from '../../request';

const defaultState = {
  singerList: [],
  enterLoading: true, // 控制进场Loading
  pullUpLoading: false, // 控制上拉加载动画
  pullDownLoading: false, // 控制下拉加载动画
  pageCount: 0, // 这里是当前页数，实现分页功能
};

export const types = {
  CHANGE_SINGER_LIST: 'singers/CHANGE_SINGER_LIST',
  CHANGE_PAGE_COUNT: 'singers/PAGE_COUNT',
  CHANGE_ENTER_LOADING: 'singers/ENTER_LOADING',
  CHANGE_PULL_UP_LOADING: 'singers/CHANGE_PULL_UP_LOADING',
  CHANGE_PULL_DOWN_LOADING: 'singers/CHANGE_PULL_DOWN_LOADING',
};

const changeSingerList = data => ({
  type: types.CHANGE_SINGER_LIST,
  data: data,
});
//action creators
export const actions = {
  // 加载对应类别的歌手
  getSingerList: (type, area, alpha) => {
    return dispatch => {
      getSingerListRequest(type, area, alpha, 0)
        .then(res => {
          const data = res.artists;
          dispatch(changeSingerList(data));
          dispatch(actions.changeEnterLoading(false));
          dispatch(actions.changePullDownLoading(false));
        })
        .catch(() => {
          console.log('歌手数据获取失败');
        });
    };
  },
  // 进场loading
  changeEnterLoading: data => ({
    type: types.CHANGE_ENTER_LOADING,
    data,
  }),
  // 滑动最底部loading
  changePullUpLoading: data => ({
    type: types.CHANGE_PULL_UP_LOADING,
    data,
  }),
  //顶部下拉刷新loading
  changePullDownLoading: data => ({
    type: types.CHANGE_PULL_DOWN_LOADING,
    data,
  }),
  changePageCount: data => ({
    type: types.CHANGE_PAGE_COUNT,
    data,
  }),
};

const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_SINGER_LIST:
        draft.singerList = action.data;
        break;
      case types.CHANGE_ENTER_LOADING:
        draft.enterLoading = action.data;
        break;
      case types.CHANGE_PULL_DOWN_LOADING:
        draft.pullDownLoading = action.data;
        break;
    }
  });

export default reducer;

// selectors
export const getSingerList = state => {
  return state.singer.singerList;
};
export const getEnterLoading = state => {
  return state.singer.enterLoading;
};
export const getPullDownLoading = state => {
  return state.singer.pullDownLoading;
};

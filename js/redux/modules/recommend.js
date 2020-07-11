import {fromJS} from 'immutable'; // 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构
import {getBannerRequest, getRecommendListRequest} from '../../request';

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
});

export const types = {
  CHANGE_BANNER: 'recommend/CHANGE_BANNER',
  CHANGE_RECOMMEND_LIST: 'recommend/CHANGE_RECOMMEND_LIST',
  CHANGE_ENTER_LOADING: 'recommend/CHANGE_ENTER_LOADING',
};

const changeBannerList = data => ({
  type: types.CHANGE_BANNER,
  data: fromJS(data),
});
const changeRecommendList = data => ({
  type: types.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
});

//action creators
export const actions = {
  getBannerList: () => {
    return dispatch => {
      getBannerRequest()
        .then(data => {
          dispatch(changeBannerList(data.banners));
        })
        .catch(() => {
          console.log('轮播图数据传输错误');
        });
    };
  },
  getRecommendList: () => {
    return dispatch => {
      getRecommendListRequest()
        .then(data => {
          dispatch(changeRecommendList(data.result));
          dispatch(actions.changeEnterLoading(false));
        })
        .catch(() => {
          console.log('推荐歌单数据传输错误');
        });
    };
  },
  changeEnterLoading: data => ({
    type: types.CHANGE_ENTER_LOADING,
    data,
  }),
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case types.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    case types.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getBannerList = state => {
  return state.getIn(['recommend', 'bannerList']);
};
export const getRecommendList = state => {
  return state.getIn(['recommend', 'recommendList']);
};
export const getEnterLoading = state => {
  return state.getIn(['recommend', 'enterLoading']);
};

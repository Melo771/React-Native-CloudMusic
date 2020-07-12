import produce from 'immer';
import {getBannerRequest, getRecommendListRequest} from '../../request';

const defaultState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
};

export const types = {
  CHANGE_BANNER: 'recommend/CHANGE_BANNER',
  CHANGE_RECOMMEND_LIST: 'recommend/CHANGE_RECOMMEND_LIST',
  CHANGE_ENTER_LOADING: 'recommend/CHANGE_ENTER_LOADING',
};

const changeBannerList = data => ({
  type: types.CHANGE_BANNER,
  data,
});
const changeRecommendList = data => ({
  type: types.CHANGE_RECOMMEND_LIST,
  data,
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

const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_BANNER:
        draft.bannerList = action.data;
        break;
      case types.CHANGE_RECOMMEND_LIST:
        draft.recommendList = action.data;
        break;
      case types.CHANGE_ENTER_LOADING:
        draft.enterLoading = action.data;
        break;
    }
  });

export default reducer;

// selectors
export const getBannerList = state => {
  return state.recommend.bannerList;
};
export const getRecommendList = state => {
  return state.recommend.recommendList;
};
export const getEnterLoading = state => {
  return state.recommend.enterLoading;
};

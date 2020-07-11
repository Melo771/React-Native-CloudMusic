import {get} from './config';

export const getBannerRequest = () => {
  return get('/banner?type=2');
};

export const getRecommendListRequest = () => {
  return get('/personalized');
};

export const getHotSingerListRequest = count => {
  return get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (category, alpha, count) => {
  return get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`,
  );
};

export const getRankListRequest = () => {
  return get('/toplist/detail');
};

export const getAlbumDetailRequest = id => {
  return get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = id => {
  return get(`/artists?id=${id}`);
};

export const getLyricRequest = id => {
  return get(`/lyric?id=${id}`);
};

export const getHotKeyWordsRequest = () => {
  return get('/search/hot');
};

export const getSuggestListRequest = query => {
  return get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return get(`/search?keywords=${query}`);
};

export const getSongDetailRequest = id => {
  return get(`/song/detail?ids=${id}`);
};

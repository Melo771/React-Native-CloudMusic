/**
 * 全局样式
 */

import {Dimensions, PixelRatio} from 'react-native';

const BACKGROUND_COLOR = '#fff';
const {height, width} = Dimensions.get('window');
export default {
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  root_container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  nav_bar_height_ios: 44,
  nav_bar_height_android: 55,
  backgroundColor: BACKGROUND_COLOR,
  window_height: height,
  window_Width: width,
  onePixel: 1 / PixelRatio.get(),
  themeColor: '#d44439',
  themeColorShadow: 'rgba(212, 68, 57, .5)',
  fixedLoading: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
};

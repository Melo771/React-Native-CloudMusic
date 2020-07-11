import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  getBannerList,
  getEnterLoading,
  getRecommendList,
  actions as recommendActions,
} from '../../redux/modules/recommend';
import GlobalStyles from '../../res/styles/GlobalStyles';
const {width} = Dimensions.get('window');

function Recommend(props) {
  const {bannerList, recommendList, enterLoading} = props;

  useEffect(() => {
    if (!bannerList.size) {
      props.recommendActions.getBannerList();
    }
    if (!recommendList.size) {
      props.recommendActions.getRecommendList();
    }
    //eslint-disable-next-line
  }, []);

  const bannerListJs = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  const renderSwiper = () => {
    return (
      <View style={styles.swiper}>
        <Swiper
          width={width * 0.98}
          dotStyle={{bottom: -15}}
          activeDotStyle={{bottom: -15}}
          activeDotColor={GlobalStyles.themeColor}
          showsButtons={false}
          autoplay={true}>
          {bannerListJs.map((item, index) => {
            return (
              <View key={index} style={styles.slide}>
                <Image style={styles.image} source={{uri: item.pic}} />
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.swiperWrapper}>
        <View style={styles.swiperBefore} />
        {renderSwiper()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  swiperWrapper: {
    flex: 1,
    position: 'relative',
  },
  swiperBefore: {
    height: 100,
    backgroundColor: GlobalStyles.themeColor,
  },
  swiper: {
    position: 'absolute',
    height: 160,
    left: width * 0.01,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    borderRadius: 6,
    width: width * 0.98,
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state, props) => {
  return {
    bannerList: getBannerList(state),
    recommendList: getRecommendList(state),
    enterLoading: getEnterLoading(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    recommendActions: bindActionCreators(recommendActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recommend);

import React, {memo, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  actions as recommendActions,
  getBannerList,
  getEnterLoading,
  getRecommendList,
} from '../../redux/modules/recommend';
import GlobalStyles from '../../res/styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

function Recommend(props) {
  const {bannerList, recommendList, enterLoading} = props;

  useEffect(() => {
    if (!bannerList.length) {
      props.recommendActions.getBannerList();
    }
    if (!recommendList.length) {
      props.recommendActions.getRecommendList();
    }
    // eslint-disable-next-line
  }, []);

  // 轮播
  const renderSwiper = () => {
    return (
      <View style={styles.swiper}>
        <Swiper
          dotStyle={{bottom: -15}}
          activeDotStyle={{bottom: -15}}
          activeDotColor={GlobalStyles.themeColor}
          showsButtons={false}
          autoplay={true}>
          {bannerList.map((item, index) => {
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

  // 处理收听量
  const getCount = count => {
    if (count < 0) {
      return;
    }
    if (count < 10000) {
      return count;
    } else if (Math.floor(count / 10000) < 10000) {
      return Math.floor(count / 1000) / 10 + '万';
    } else {
      return Math.floor(count / 10000000) / 10 + '亿';
    }
  };

  const toDetail = data => {
    console.log(props);
    props.navigation.navigate('RankingDetail', {...data});
  };

  // 推荐列表
  const renderList = () => {
    return recommendList.map((item, index) => (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => toDetail(item)}
        style={styles.recommendItem}
        key={index}>
        <View style={styles.recommendItemContainer}>
          <Image
            style={styles.recommendItemImg}
            source={{uri: item.picUrl + '?param=300x300'}}
          />
          <View style={styles.recommendItemCount}>
            <Ionicons name="md-headset" color={'#fff'} size={14} />
            <Text style={styles.recommendItemCountText}>
              {getCount(item.playCount)}
            </Text>
          </View>
        </View>
        <Text style={styles.recommendItemDesc}>{item.name}</Text>
      </TouchableOpacity>
    ));
  };

  const linearGradientColors =
    bannerList.length && recommendList.length
      ? [GlobalStyles.themeColor, GlobalStyles.themeColor, '#fff', '#fff']
      : ['#fff', '#fff'];
  return (
    <LinearGradient
      colors={linearGradientColors}
      style={[GlobalStyles.root_container, {justifyContent: 'center'}]}>
      {enterLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <View style={styles.swiperWrapper}>
            <View style={styles.swiperBefore} />
            {renderSwiper()}
          </View>
          <View style={styles.recommendWrapper}>
            <Text style={styles.recommendTitle}>推荐歌单</Text>
            <View style={styles.recommendListWrapper}>{renderList()}</View>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  swiperWrapper: {
    height: 160,
    position: 'relative',
    backgroundColor: '#fff',
  },
  swiperBefore: {
    height: 100,
    backgroundColor: GlobalStyles.themeColor,
  },
  swiper: {
    paddingHorizontal: 4,
    height: 160,
    position: 'absolute',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    borderRadius: 6,
  },
  recommendWrapper: {
    backgroundColor: '#fff',
  },
  recommendTitle: {
    fontWeight: '700',
    paddingLeft: 6,
    fontSize: 14,
    lineHeight: 60,
  },
  recommendListWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flex: 1,
  },
  recommendItem: {
    width: width * 0.32,
  },
  recommendItemContainer: {
    alignItems: 'center',
  },
  recommendItemImg: {
    width: width * 0.32,
    height: 115,
    borderRadius: 3,
  },
  recommendItemCount: {
    position: 'absolute',
    top: 2,
    right: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendItemCountText: {
    marginLeft: 3,
    color: '#fff',
    fontSize: 12,
  },
  recommendItemDesc: {
    marginTop: 4,
    marginBottom: 2,
    height: 50,
    color: '#2E3030',
    paddingHorizontal: 4,
    fontSize: 12,
  },
});

const mapStateToProps = state => {
  return {
    bannerList: getBannerList(state),
    recommendList: getRecommendList(state),
    enterLoading: getEnterLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    recommendActions: bindActionCreators(recommendActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Recommend));

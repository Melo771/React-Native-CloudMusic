import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceInfo,
  Platform,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../res/styles/GlobalStyles';
import NavigationUtil from '../navigator/NavigationUtil';

const window = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT =
  Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated ? 350 : 270;
const TOP =
  Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 15;
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios'
    ? GlobalStyles.nav_bar_height_ios + TOP
    : GlobalStyles.nav_bar_height_android;

// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
};

class Talks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, backgroundImg, title, onselect} = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          translucent={true}
          animated={true}
        />
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={rowData => {
            const {item, index} = rowData;
            return (
              <TouchableOpacity
                onPress={() => onselect(item, index)}
                activeOpacity={1}
                key={rowData}
                style={styles.row}>
                <Text style={styles.rowSeq}>{index + 1}</Text>
                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.rowText}>
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.rowSubText}>
                    {item.ar ? getName(item.ar) : getName(item.artists)} -{' '}
                    {item.al ? item.al.name : item.album.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          renderScrollComponent={props => (
            <ParallaxScrollView
              backgroundColor={GlobalStyles.themeColor}
              contentBackgroundColor={GlobalStyles.backgroundColor}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}
              renderBackground={() => (
                <View key="background">
                  <Image
                    source={{
                      uri: backgroundImg,
                    }}
                    style={{
                      height: PARALLAX_HEADER_HEIGHT,
                      width: window.width,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: window.width,
                      backgroundColor: 'rgba(0,0,0,.4)',
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                </View>
              )}
              renderForeground={() => (
                <View key="parallax-header" style={styles.parallaxHeader}>
                  <Text style={styles.sectionSpeakerText}>{title}</Text>
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                  <Text style={styles.stickySectionText}>{title}</Text>
                </View>
              )}
              renderFixedHeader={() => (
                <View key="fixed-header" style={styles.fixedSection}>
                  <TouchableOpacity
                    onPress={() => NavigationUtil.goBack(this.props.navigation)}
                    style={{padding: 8, paddingLeft: 12}}>
                    <Ionicons
                      name={'ios-arrow-back'}
                      size={26}
                      style={{color: 'white'}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: TOP,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 16,
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: TOP,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5,
  },
  row: {
    paddingTop: 20,
    paddingRight: 20,
    overflow: 'hidden',
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSeq: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'rgb(187, 168, 168)',
  },
  rowText: {
    fontSize: 16,
  },
  rowSubText: {
    marginTop: 5,
    fontSize: 14,
    color: 'rgb(187, 168, 168)',
  },
});

export default Talks;

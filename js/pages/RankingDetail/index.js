/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
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
import GlobalStyles from '../../res/styles/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtil';

class Talks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        'Simplicity Matters',
        'Hammock Driven Development',
        'Value of Values',
        'Are We There Yet?',
        'The Language of the System',
        'Design, Composition, and Performance',
        'Clojure core.async',
        'The Functional Database',
        'Deconstructing the Database',
        'Hammock Driven Development',
        'Value of Values',
      ],
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          translucent={true}
          animated={true}
        />
        <FlatList
          ref="ListView"
          style={styles.container}
          data={this.state.dataSource}
          renderItem={rowData => {
            return (
              <View key={rowData} style={styles.row}>
                <Text style={styles.rowText}>{rowData.item}</Text>
              </View>
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
                      uri:
                        'https://p2.music.126.net/nILBk4DaE3yV__25uq-5GQ==/18641120139241412.jpg',
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT,
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
                  <Text style={styles.sectionSpeakerText}>
                    Talks by Rich Hickey
                  </Text>
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                  <Text style={styles.stickySectionText}>
                    Rich Hickey Talks
                  </Text>
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

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios'
    ? GlobalStyles.nav_bar_height_ios + TOP
    : GlobalStyles.nav_bar_height_android;

const TOP =
  Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
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
    fontSize: 20,
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
    flex: 1,
    flexDirection: 'column',
    paddingTop: 150,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5,
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 20,
  },
});

export default Talks;

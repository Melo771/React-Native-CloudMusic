import React, {memo, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Animated,
  ImageBackground,
} from 'react-native';
import Slider from 'react-native-slider';
import GlobalStyles from '../../res/styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus';

function Player() {
  const [showLyric, setShowLyric] = useState(false);

  const animatedValue = new Animated.Value(0);

  const interpolatedAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* 状态栏 沉浸式 */}
      <StatusBar
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
        animated={true}
      />

      {/* 背景 */}
      <Image
        style={styles.background}
        blurRadius={8}
        source={{
          uri:
            'https://p1.music.126.net/fkqFqMaEt0CzxYS-0NpCog==/18587244069235039.jpg?param=300x300',
        }}
      />

      <SafeAreaViewPlus topInset={true} style={{zIndex: 5, flex: 1}}>
        {/* header*/}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons
              name={'ios-arrow-back'}
              size={26}
              style={{color: 'white'}}
            />
          </TouchableOpacity>
          <View style={styles.headerTextWrapper}>
            <Text style={[styles.headerText, {fontSize: 16}]}>
              {'烟火里的肠癌'}
            </Text>
            <Text style={styles.headerText}>{'华晨宇'}</Text>
          </View>
          <View />
        </View>

        {/* CD */}
        <View style={styles.cdContainer}>
          <View style={styles.needle}>
            <Image
              source={require('./images/needle-ip6.png')}
              style={styles.needleImg}
            />
          </View>
          <ImageBackground
            source={require('./images/disc-ip6.png')}
            style={styles.disc}>
            <Animated.Image
              source={{
                uri:
                  "https://p1.music.126.net/fkqFqMaEt0CzxYS-0NpCog==/18587244069235039.jpg?param=300x300'",
              }}
              style={[
                styles.discInnerImg,
                {transform: [{rotate: interpolatedAnimation}]},
              ]}
            />
          </ImageBackground>
        </View>

        {/* Slider 滑块 */}
        <View style={styles.slider}>
          <Text style={styles.sliderTime}>{'1:14'}</Text>
          <Slider
            maximumTrackTintColor={'white'}
            minimumTrackTintColor={'white'}
            thumbStyle={styles.thumb}
            trackStyle={{height: 2}}
            style={{width: GlobalStyles.window_Width - 100}}
            value={0.2}
            // onValueChange={value => this.sliderChange(value)}
          />
          <Text style={styles.sliderTime}>{'3:55'}</Text>
        </View>

        {/* 操作栏 */}
        <View style={styles.actionBar}>
          <Ionicons name={'md-repeat'} size={35} style={{color: 'white'}} />
          <Feather name={'skip-back'} size={35} style={{color: 'white'}} />
          <TouchableOpacity>
            <Feather name={'pause-circle'} size={35} style={{color: 'white'}} />
            {/*<Feather name={'play-circle'} size={35} style={{color: 'white'}} />*/}
          </TouchableOpacity>
          <Feather name={'skip-forward'} size={35} style={{color: 'white'}} />
          <MaterialCommunityIcons
            name={'playlist-music'}
            size={35}
            style={{color: 'white'}}
          />
        </View>
      </SafeAreaViewPlus>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    width: GlobalStyles.window_Width,
    height: GlobalStyles.window_height,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.8,
  },
  header: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: GlobalStyles.onePixel,
    borderColor: 'rgba(245, 245, 245, 0.21)',
  },
  headerTextWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
  },
  cdContainer: {
    flex: 1,
    alignItems: 'center',
  },
  needle: {
    position: 'absolute',
    top: 0,
    left: 34,
    width: GlobalStyles.window_Width,
    alignItems: 'center',
    zIndex: 18,
  },
  needleImg: {
    width: 100,
    height: 140,
  },
  disc: {
    width: GlobalStyles.window_Width - 40,
    height: GlobalStyles.window_Width - 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  discInnerImg: {
    width: GlobalStyles.window_Width - 152,
    height: GlobalStyles.window_Width - 152,
    borderRadius: (GlobalStyles.window_Width - 152) / 2,
  },
  actionBar: {
    marginBottom: 20,
    paddingHorizontal: 50,
    height: 50,
    width: GlobalStyles.window_Width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    paddingHorizontal: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderTime: {
    width: 35,
    color: 'white',
    textAlign: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: GlobalStyles.themeColor,
    borderColor: 'white',
    borderWidth: 7,
    borderRadius: 10,
  },
});

export default memo(Player);

import React, {memo, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  actions as recommendActions,
  getBannerList,
  getEnterLoading,
  getRecommendList,
} from '../../redux/modules/recommend';
import GlobalStyles from '../../res/styles/GlobalStyles';

function Ranking(props) {
  const renderSongList = () => {
    const arr = [1, 1, 1];
    return arr.map(item => {
      return <Text style={styles.songText}>1.夏天的风 - 王巨星</Text>;
    });
  };

  const renderOfficial = () => {
    return (
      <View>
        <View style={styles.official}>
          <View style={styles.listItem}>
            <Image
              style={styles.listItemImg}
              source={{
                uri:
                  'https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
              }}
            />
            <Text style={styles.listItemDesc}>每天更新</Text>
          </View>
          <View style={styles.songListWrapper}>{renderSongList()}</View>
        </View>
        <View style={styles.official}>
          <View style={styles.listItem}>
            <Image
              style={styles.listItemImg}
              source={{
                uri:
                  'https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
              }}
            />
            <Text style={styles.listItemDesc}>每天更新</Text>
          </View>
          <View style={styles.songListWrapper}>{renderSongList()}</View>
        </View>
        <View style={styles.official}>
          <View style={styles.listItem}>
            <Image
              style={styles.listItemImg}
              source={{
                uri:
                  'https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
              }}
            />
            <Text style={styles.listItemDesc}>每天更新</Text>
          </View>
          <View style={styles.songListWrapper}>{renderSongList()}</View>
        </View>
        <View style={[styles.official, {marginBottom: 0}]}>
          <View style={styles.listItem}>
            <Image
              style={styles.listItemImg}
              source={{
                uri:
                  'https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
              }}
            />
            <Text style={styles.listItemDesc}>每天更新</Text>
          </View>
          <View style={styles.songListWrapper}>{renderSongList()}</View>
        </View>
      </View>
    );
  };

  const renderGlobalList = () => {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      let item = (
        <View
          key={i}
          style={[
            styles.listItem,
            styles.listItemForGlobal,
            (i + 1) % 3 === 0 && {marginRight: 0},
          ]}>
          <Image
            style={[styles.listItemImg, styles.listItemForGlobalImg]}
            source={{
              uri:
                'https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
            }}
          />
          <Text style={styles.listItemDesc}>每天更新</Text>
        </View>
      );
      arr.push(item);
    }
    return arr;
  };

  return (
    <View style={[GlobalStyles.root_container, styles.container]}>
      <ScrollView>
        <View>
          <Text style={styles.title}>官方榜</Text>
          {renderOfficial()}
        </View>
        <View>
          <Text style={styles.title}>全球榜</Text>
          <View style={styles.global}>{renderGlobalList()}</View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 6,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 50,
  },
  official: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  global: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  listItem: {
    flexDirection: 'row',
    position: 'relative',
    width: 100,
    height: 100,
  },
  listItemForGlobal: {
    marginRight: 4,
    width: 130,
    height: 130,
    marginBottom: 8,
  },
  listItemForGlobalImg: {
    width: 130,
    height: 130,
  },
  listItemImg: {
    width: 100,
    height: 100,
    borderRadius: 3,
  },
  listItemDesc: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    fontSize: 12,
    color: '#fff',
  },
  songListWrapper: {
    justifyContent: 'space-around',
    padding: 10,
  },
  songText: {
    fontSize: 14,
    color: 'grey',
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
)(memo(Ranking));

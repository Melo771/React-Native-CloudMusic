import React, {memo, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  actions as rankActions,
  getLoading,
  getRankList,
} from '../../redux/modules/ranking';
import GlobalStyles from '../../res/styles/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtil';

// 处理数据，找出第一个没有歌名的排行榜的索引
const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

function Ranking(props) {
  const {rankList, loading} = props;

  useEffect(() => {
    if (!rankList.length) {
      props.rankActions.getRankList();
    }
    // eslint-disable-next-line
  }, []);

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const renderSongList = list => {
    return list.map((item, index) => {
      return (
        <Text key={index} style={styles.songText}>
          {index + 1}. {item.first} - {item.second}
        </Text>
      );
    });
  };

  const toDetail = data => {
    NavigationUtil.goPage('PlayList', {id: data.id});
  };

  const renderOfficial = () => {
    return officialList.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => toDetail(item)}
          activeOpacity={1}
          key={index}
          style={[
            styles.official,
            index === officialList.length - 1 && {marginBottom: 0},
          ]}>
          <RankingCard img={item.coverImgUrl} desc={item.updateFrequency} />
          <View style={styles.songListWrapper}>
            {renderSongList(item.tracks)}
          </View>
        </TouchableOpacity>
      );
    });
  };

  const renderGlobalList = () => {
    return globalList.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => toDetail(item)}
          activeOpacity={1}
          key={index}
          style={(index + 1) % 3 === 0 ? {marginRight: 0} : {marginRight: 4.7}}>
          <RankingCard
            img={item.coverImgUrl}
            desc={item.updateFrequency}
            isGlobal={true}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={[GlobalStyles.root_container, styles.container]}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <Text style={styles.title}>官方榜</Text>
          {renderOfficial()}
          <Text style={styles.title}>全球榜</Text>
          <View style={styles.global}>{renderGlobalList()}</View>
        </ScrollView>
      )}
    </View>
  );
}

function RankingCard(props) {
  const {img, desc, isGlobal} = props;
  return (
    <View style={[styles.listItemImg, isGlobal && styles.listItemForGlobal]}>
      <Image
        style={[styles.listItemImg, isGlobal && styles.listItemForGlobalImg]}
        source={{
          uri: img,
        }}
      />
      <Text style={styles.listItemDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    justifyContent: 'center',
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
  },
  listItem: {
    flexDirection: 'row',
    position: 'relative',
    width: 100,
    height: 100,
  },
  listItemForGlobal: {
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
    loading: getLoading(state),
    rankList: getRankList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rankActions: bindActionCreators(rankActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Ranking));

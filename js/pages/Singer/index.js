import React, {memo, useEffect, useState, forwardRef, useRef} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  actions as singerActions,
  getEnterLoading,
  getSingerList,
  getPullDownLoading,
} from '../../redux/modules/singer';
import GlobalStyles from '../../res/styles/GlobalStyles';
import {TYPES, AREA, INITIALS} from '../../res/constants/SingerKeys';

function Singer(props) {
  const {singerList, enterLoading, singerActions} = props;
  const [activeType, changeType] = useState(TYPES[0].key);
  const [activeArea, changeArea] = useState(AREA[0].key);
  const [activeInitial, changeInitial] = useState(INITIALS[0].key);

  // 歌手列表
  const singerListRef = useRef(null);
  useEffect(() => {
    if (!singerList.length) {
      fetchSingerList();
    }
    // eslint-disable-next-line
  }, []);

  /**
   * 加载歌手列表
   * @param type 类别
   * @param area 地区
   * @param initial 首字母
   */
  const fetchSingerList = (
    type = activeType,
    area = activeArea,
    initial = activeInitial,
  ) => {
    singerActions.getSingerList(type, area, initial);
  };

  // const onTypeChange = category => {
  //   changeType(category.key);
  //   fetchSingerList(category.key, activeArea, activeInitial);
  // };
  //
  // const onAreaChange = category => {
  //   changeArea(category.key);
  //   fetchSingerList(activeType, category.key, activeInitial);
  // };

  const onChangeInitial = data => {
    if (activeInitial === data.key) {
      return;
    }
    changeInitial(data.key);
    singerActions.changeEnterLoading(true);
    fetchSingerList(activeType, activeArea, data.key);
    singerListRef.current.scrollToOffset({offset: 0});
  };

  const onRefresh = () => {
    singerActions.changePullDownLoading(true);
    fetchSingerList();
  };

  return (
    <View style={[GlobalStyles.root_container, styles.container]}>
      {/*<Categories onChange={onTypeChange} data={TYPES} />*/}
      {/*<Categories onChange={onAreaChange} data={AREA} />*/}
      <>
        <SingerList
          {...props}
          ref={singerListRef}
          onRefresh={onRefresh}
          data={singerList}
        />
        <ScrollBar onChange={onChangeInitial} data={INITIALS} />
        {enterLoading ? (
          <ActivityIndicator style={styles.fixedLoading} size="large" />
        ) : null}
      </>
    </View>
  );
}

function Categories({data, onChange}) {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.categories}>
      {data.map((item, index) => {
        return (
          <Text
            key={index}
            onPress={() => {
              setActive(index);
              onChange(item);
            }}
            style={[
              styles.category,
              active === index && styles.categoryActive,
            ]}>
            {item.name}
          </Text>
        );
      })}
    </View>
  );
}

const SingerList = forwardRef((props, ref) => {
  const {onRefresh, data, pullDownLoading} = props;
  const renderItem = ({item}) => (
    <View style={styles.singerItem}>
      <Image
        style={styles.singerItemImg}
        source={{
          uri: `${item.picUrl}?param=200x200`,
        }}
      />
      <Text style={styles.singerItemName}>{item.name}</Text>
    </View>
  );
  return (
    <FlatList
      style={styles.singerList}
      ref={ref}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      refreshControl={
        <RefreshControl
          title={'Loading'}
          titleColor={GlobalStyles.themeColor}
          colors={[GlobalStyles.themeColor]}
          refreshing={pullDownLoading}
          onRefresh={onRefresh}
          tintColor={GlobalStyles.themeColor}
        />
      }
    />
  );
});

function ScrollBar({data, onChange}) {
  const [active, setActive] = useState(0);

  return (
    <View style={[styles.scrollBar]}>
      {data.map((item, index) => {
        return (
          <Text
            onPress={() => {
              setActive(index);
              onChange(item);
            }}
            key={item.key}
            style={[
              styles.scrollBarItem,
              active === index && styles.scrollBarItemActive,
            ]}>
            {item.name}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  category: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    minWidth: 50,
    textAlign: 'center',
  },
  categoryActive: {
    backgroundColor: GlobalStyles.themeColor,
    color: '#fff',
  },
  singerList: {
    paddingHorizontal: 10,
  },
  singerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  singerItemImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  singerItemName: {},
  scrollBar: {
    position: 'absolute',
    top: 30,
    right: 0,
    paddingVertical: 20,
    width: 30,
  },
  scrollBarItem: {
    marginBottom: 5,
    textAlign: 'center',
  },
  scrollBarItemActive: {
    color: GlobalStyles.themeColor,
  },
  fixedLoading: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
});

const mapStateToProps = state => {
  return {
    enterLoading: getEnterLoading(state),
    singerList: getSingerList(state),
    pullDownLoading: getPullDownLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    singerActions: bindActionCreators(singerActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Singer));

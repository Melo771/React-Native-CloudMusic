import React, {memo, useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  actions as rankActions,
  getLoading,
  getRankList,
} from '../../redux/modules/ranking';
import GlobalStyles from '../../res/styles/GlobalStyles';
import {TYPES, AREA, INITIAL} from '../../res/constants/SingerKeys';

function Ranking(props) {
  const {rankList} = props;

  useEffect(() => {
    if (!rankList.length) {
      props.rankActions.getRankList();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <View style={[GlobalStyles.root_container, styles.container]}>
      <Categories data={TYPES} />
      <Categories data={AREA} />
    </View>
  );
}

function Categories({data}) {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.categories}>
      {data.map((item, index) => {
        return (
          <Text
            key={index}
            onPress={() => setActive(index)}
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
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

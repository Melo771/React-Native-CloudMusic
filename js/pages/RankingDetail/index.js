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
import NavigationBar from '../../components/NavigationBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus';

function RankingDetail(props) {
  const onBack = () => {
    props.navigation.goBack();
  };

  const renderNavigationBar = () => {
    let statusBar = {
      backgroundColor: GlobalStyles.themeColor,
    };
    return (
      <NavigationBar
        statusBar={statusBar}
        style={{
          paddingHorizontal: 10,
          backgroundColor: 'transparent',
          position: 'absolute',
          zIndex: 10,
          top: 44,
        }}
        leftButton={
          <TouchableOpacity
            onPress={onBack}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="keyboard-arrow-left"
              color={'#fff'}
              size={30}
            />
            <Text style={{color: '#fff', fontSize: 16}}>薛之谦</Text>
          </TouchableOpacity>
        }
      />
    );
  };

  return (
    <View style={[GlobalStyles.root_container]}>
      <View style={styles.container}>
        <View style={styles.imgFilter} />
        {renderNavigationBar()}
        <View style={styles.imgWrapper}>
          <Image
            style={styles.img}
            source={{
              uri:
                'https://p1.music.126.net/LCWqYYKoCEZKuAC3S3lIeg==/109951165034938865.jpg',
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imgWrapper: {},
  imgFilter: {
    position: 'absolute',
    zIndex: 10,
    width: GlobalStyles.window_Width,
    height: 340,
    backgroundColor: 'rgba(7, 17, 27, 0.3)',
  },
  img: {
    position: 'absolute',
    width: GlobalStyles.window_Width,
    height: 340,
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
)(memo(RankingDetail));

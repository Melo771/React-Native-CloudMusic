import React, {memo, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {
  actions as singerDetailActions,
  getEnterLoading,
  getSingerDetail,
  getSongsOfSinger,
} from '../../redux/modules/singerDetail';
import DetailCommon from '../../components/DetailCommon';
import GlobalStyles from '../../res/styles/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtil';

function SingerDetail(props) {
  const {singerDetail, songs, enterLoading, singerDetailActions} = props;

  const id = props.route.params.id;
  useEffect(() => {
    singerDetailActions.getSingerDetail(id);
    singerDetailActions.changeEnterLoading(true);
  }, [id, singerDetailActions]);

  const onselect = item => {
    console.log(item);
    NavigationUtil.goPage('Player', {...item});
  };

  const params = {
    data: songs,
    backgroundImg: singerDetail.picUrl,
    title: singerDetail.name,
  };

  return (
    <>
      <DetailCommon onselect={onselect} {...props} {...params} />
      {enterLoading ? (
        <ActivityIndicator style={GlobalStyles.fixedLoading} size="large" />
      ) : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    enterLoading: getEnterLoading(state),
    singerDetail: getSingerDetail(state),
    songs: getSongsOfSinger(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    singerDetailActions: bindActionCreators(singerDetailActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(SingerDetail));

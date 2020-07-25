import React, {memo, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {
  actions as playListActions,
  getEnterLoading,
  getPlayListDetail,
} from '../../redux/modules/playlist';
import DetailCommon from '../../components/DetailCommon';
import GlobalStyles from '../../res/styles/GlobalStyles';

function PlayList(props) {
  const {playListDetail, enterLoading, playListActions} = props;

  const id = props.route.params.id;
  useEffect(() => {
    playListActions.getPlayListDetail(id);
    playListActions.changeEnterLoading(true);
  }, []);

  const params = {
    data: playListDetail.tracks,
    backgroundImg: playListDetail.coverImgUrl,
    title: playListDetail.name,
  };

  return (
    <>
      <DetailCommon {...props} {...params} />
      {enterLoading ? (
        <ActivityIndicator style={GlobalStyles.fixedLoading} size="large" />
      ) : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    enterLoading: getEnterLoading(state),
    playListDetail: getPlayListDetail(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    playListActions: bindActionCreators(playListActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(PlayList));

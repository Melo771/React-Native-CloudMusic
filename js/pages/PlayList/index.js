import React, {memo, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
  actions as playListActions,
  getEnterLoading,
  getPlayListDetail,
} from '../../redux/modules/playlist';
import DetailCommon from '../../components/DetailCommon';

function PlayList(props) {
  const id = props.route.params.id;
  useEffect(() => {
    props.playListActions.getPlayListDetail(id);
  }, [id, props.playListActions]);

  console.log(props.playListDetail);
  const {playListDetail} = props;
  const params = {
    data: playListDetail.tracks,
    backgroundImg: playListDetail.coverImgUrl,
    title: playListDetail.name,
  };

  return <DetailCommon {...props} {...params} />;
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

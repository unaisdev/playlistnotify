import React, {useCallback, useState} from 'react';

import {Dimensions, Image, StyleSheet, View} from 'react-native';

import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import {BottomSheetScrollView, TouchableOpacity} from '@gorhom/bottom-sheet';

import {useBottomSheetContext} from '../../../../../containers/bottomSheetContext';
import {PlaylistItem, Track} from '../../../../../services/types';
import {useTracksInfo} from '@app/features/commons/hooks/useTracksInfo';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {SwiperFlatListWithGestureHandler} from 'react-native-swiper-flatlist/WithGestureHandler';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';
import AddedTracks from './components/AddedTracks';
import DeletedTracks from './components/DeletedTracks';
import {useBSContent} from './hooks/useBSContent';
import Text from '@app/features/commons/layout/Text';

type TracksListProps = {
  tracksNew?: PlaylistItem[];
  tracksDel?: Track[];
};

const Content = () => {
  const {tracksNew, tracksDel, scrollRef, goToFirstIndex, goToSecondIndex} =
    useBSContent();

  return (
    <View style={{paddingVertical: 20, flex: 1}}>
      <View style={styles.inline}>
        <TouchableOpacity style={{padding: 12}} onPress={goToFirstIndex}>
          <Text>AÑADIDAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 12}} onPress={goToSecondIndex}>
          <Text>ELIMINADAS</Text>
        </TouchableOpacity>
      </View>
      <BottomSheetScrollView enableFooterMarginAdjustment>
        <SwiperFlatListWithGestureHandler
          ref={scrollRef}
          horizontal
          index={0}
          style={{flex: 1, backgroundColor: 'gray'}}>
          <View style={[styles.child, {backgroundColor: 'tomato'}]}>
            <AddedTracks tracksNew={tracksNew} />
          </View>
          <View style={[styles.child, {backgroundColor: 'thistle'}]}>
            <DeletedTracks tracksDel={tracksDel} />
          </View>
        </SwiperFlatListWithGestureHandler>
      </BottomSheetScrollView>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inline: {
    top: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  inlineCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
  child: {width, justifyContent: 'center'},
});

export default Content;

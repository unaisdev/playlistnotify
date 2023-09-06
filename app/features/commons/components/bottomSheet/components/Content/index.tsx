import React, {useCallback, useState} from 'react';

import {Dimensions, Image, StyleSheet, View} from 'react-native';

import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import {BottomSheetScrollView, TouchableOpacity} from '@gorhom/bottom-sheet';

import {useBottomSheetContext} from '../../../../../../containers/bottomSheetContext';
import {PlaylistItem, Track} from '../../../../../../services/types';
import {useTracksInfo} from '@app/features/commons/hooks/useTracksInfo';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {SwiperFlatListWithGestureHandler} from 'react-native-swiper-flatlist/WithGestureHandler';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';
import AddedTracks from './components/AddedTracks';
import DeletedTracks from './components/DeletedTracks';
import {useBSContent} from './hooks/useBSContent';
import Text from '@app/features/commons/layout/Text';
import i18n from '@app/features/locales/i18next';
import {useTranslation} from 'react-i18next';
import Layout from '@app/features/commons/layout/TabLayout';

type TracksListProps = {
  tracksNew?: PlaylistItem[];
  tracksDel?: Track[];
};

const Content = () => {
  const {tracksNew, tracksDel, scrollRef, goToFirstIndex, goToSecondIndex} =
    useBSContent();
  const {t} = useTranslation();

  return (
    <Layout style={{paddingVertical: 0, paddingHorizontal: 0}}>
      <View style={styles.inline}>
        <TouchableOpacity style={{padding: 12}} onPress={goToFirstIndex}>
          <Text>{t('tracks_added')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 12}} onPress={goToSecondIndex}>
          <Text>{t('tracks_deleted')}</Text>
        </TouchableOpacity>
      </View>
      <BottomSheetScrollView enableFooterMarginAdjustment>
        <SwiperFlatListWithGestureHandler
          ref={scrollRef}
          horizontal
          index={0}
          style={{flex: 1}}>
          <View style={[styles.child]}>
            <AddedTracks tracksNew={tracksNew} />
          </View>
          <View style={[styles.child]}>
            <DeletedTracks tracksDel={tracksDel} />
          </View>
        </SwiperFlatListWithGestureHandler>
      </BottomSheetScrollView>
    </Layout>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  inline: {
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  child: {
    width,

    justifyContent: 'flex-start',
  },
});

export default Content;

import React, {useCallback} from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

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

type TracksListProps = {
  tracksNew?: PlaylistItem[];
  tracksDel?: Track[];
};

const TracksList = ({tracksNew, tracksDel}: TracksListProps) => {
  if (tracksNew)
    return (
      <View style={{backgroundColor: 'green'}}>
        {tracksNew.map((item, index) => {
          return (
            <View
              key={item.track.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 4,
              }}>
              <Image
                source={{
                  uri:
                    item.track.album.images[0]?.url ??
                    'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2',
                }}
                width={40}
                height={40}
              />
              <Text>{item.track.name}</Text>
            </View>
          );
        })}
      </View>
    );

  if (tracksDel)
    return (
      <View style={{backgroundColor: 'red'}}>
        {tracksDel.map((item, index) => {
          return (
            <View
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 4,
              }}>
              <Image
                source={{
                  uri:
                    item.album.images[0]?.url ??
                    'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2',
                }}
                width={40}
                height={40}
              />
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
};

const Content = () => {
  const {tracksCompared} = useBottomSheetContext();
  const scrollRef = React.useRef<SwiperFlatList>(null);

  const goToFirstIndex = () => {
    scrollRef.current?.goToFirstIndex();
  };
  const goToSecondIndex = () => {
    scrollRef.current?.scrollToIndex({index: 1});
  };

  const tracksNew = tracksCompared.resultNew;
  const tracksDeleted = useTracksInfo(tracksCompared.resultDeleted);

  const filteredTracksDeleted = tracksDeleted.filter(
    track => track !== undefined,
  ) as Track[];

  return (
    <BottomSheetScrollView enableFooterMarginAdjustment style={{flex: 1}}>
      <View style={{paddingVertical: 20}}>
        <View style={styles.inline}>
          <TouchableOpacity style={{padding: 12}} onPress={goToFirstIndex}>
            <Text>AÑADIDAS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 12}} onPress={goToSecondIndex}>
            <Text>ELIMINADAS</Text>
          </TouchableOpacity>
        </View>
        <SwiperFlatListWithGestureHandler
          ref={scrollRef}
          horizontal
          index={0}
          style={{flex: 1, backgroundColor: 'gray'}}>
          <View style={[styles.child, {backgroundColor: 'tomato'}]}>
            <TracksList tracksNew={tracksNew} />
          </View>
          <View style={[styles.child, {backgroundColor: 'thistle'}]}>
            <TracksList tracksDel={filteredTracksDeleted} />
          </View>
        </SwiperFlatListWithGestureHandler>
      </View>
    </BottomSheetScrollView>
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
  child: {width, justifyContent: 'center'},
});

export default Content;

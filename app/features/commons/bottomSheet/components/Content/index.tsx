import React, {useCallback} from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {useBottomSheetContext} from '../../../../../containers/bottomSheetContext';
import {PlaylistItem, Track} from '../../../../../services/types';
import {useTracksInfo} from '@app/features/commons/hooks/useTracksInfo';
import SwiperFlatList from 'react-native-swiper-flatlist';

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

  const tracksNew = tracksCompared.resultNew;
  const tracksDeleted = useTracksInfo(tracksCompared.resultDeleted);

  const filteredTracksDeleted = tracksDeleted.filter(
    track => track !== undefined,
  ) as Track[];

  return (
    <BottomSheetScrollView
      enableFooterMarginAdjustment
      style={{flex: 1, backgroundColor: 'gray'}}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination>
        <View style={[styles.child, {backgroundColor: 'tomato'}]}>
          <TracksList tracksNew={tracksNew} />
        </View>
        <View style={[styles.child, {backgroundColor: 'thistle'}]}>
          <TracksList tracksDel={filteredTracksDeleted} />
        </View>
      </SwiperFlatList>
      <View style={styles.container}>
        <View></View>

        <View style={{flex: 1}}></View>
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
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default Content;

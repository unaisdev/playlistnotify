import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {PlaylistItem, Track} from '@app/services/types';

import {useBottomSheetContext} from '@app/containers/bottomSheetContext';
import {useTracksInfo} from '@app/hooks/useTracksInfo';

type TracksListProps = {
  tracksNew?: PlaylistItem[];
  tracksDel?: Track[];
};

const TracksList = ({tracksNew, tracksDel}: TracksListProps) => {
  if (tracksNew)
    return (
      <BottomSheetFlatList
        contentContainerStyle={{backgroundColor: 'green'}}
        data={tracksNew}
        renderItem={({item, index}) => {
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
                source={{uri: item.track.album.images[0]?.url ?? ''}}
                width={40}
                height={40}
              />
              <Text>{item.track.name}</Text>
            </View>
          );
        }}
      />
    );

  if (tracksDel)
    return (
      <BottomSheetFlatList
        data={tracksDel}
        contentContainerStyle={{backgroundColor: 'red'}}
        renderItem={({item, index}) => {
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
                source={{uri: item.album.images[0]?.url ?? ''}}
                width={40}
                height={40}
              />
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    );
};

const Content = () => {
  const {playlist, tracksUpdated} = useBottomSheetContext();

  const tracksNew = tracksUpdated.resultNew;
  const tracksDeleted = useTracksInfo(tracksUpdated.resultDeleted);

  const filteredTracksDeleted = tracksDeleted.filter(
    track => track !== undefined,
  ) as Track[];

  if (!playlist) return <Text>ESTA VACIO PLAYLIST</Text>;

  return (
    <BottomSheetScrollView enableFooterMarginAdjustment>
      <View style={styles.container}>
        <View>
          <TracksList tracksNew={tracksNew} />
        </View>

        <View>
          <TracksList tracksDel={filteredTracksDeleted} />
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default Content;

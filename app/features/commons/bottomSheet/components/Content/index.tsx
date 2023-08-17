import {Image, StyleSheet, Text, View} from 'react-native';
import {useBottomSheetContext} from '../../../../../containers/bottomSheetContext';
import {useTracksInfo} from '../../../hooks/useTracksInfo';
import {
  PlaylistItem,
  PlaylistModel,
  Track,
} from '../../../../../services/types';
import {FlatList} from 'react-native-gesture-handler';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {PlaylistItem, Track} from '@app/services/types';

import {useBottomSheetContext} from '@app/containers/bottomSheetContext';
import {useTracksInfo} from '@app/hooks/useTracksInfo';

type TracksListProps = {
  tracksNew?: PlaylistItem[];
  tracksDel?: Track[];
};

const TracksList = ({tracksNew, tracksDel}: TracksListProps) => {
  const renderItem = useCallback(
    ({item, index}) => (
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
    ),
    [],
  );

  if (tracksNew)
    return (
      <FlatList
        contentContainerStyle={{backgroundColor: 'green'}}
        data={tracksNew}
        renderItem={renderItem}
      />
    );

  if (tracksDel)
    return (
      <FlatList
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
      <View style={styles.container}>
        <View>
          <TracksList tracksNew={tracksNew} />
        </View>

        <View style={{flex: 1}}>
          <TracksList tracksDel={filteredTracksDeleted} />
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default Content;

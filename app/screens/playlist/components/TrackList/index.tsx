import {FlatList, StyleSheet, Text, View} from 'react-native';
import {PlaylistItem, PlaylistModel} from '../../../../services/types';
import TrackItem from '../TrackItem';
import {useQuery} from '@tanstack/react-query';
import {getPlaylistTracks} from '../../../../services/playlist';

interface Props {
  playlist: PlaylistModel;
}

const TrackList = ({playlist}: Props) => {
  const {data, isLoading, isFetching, error, refetch} = useQuery({
    queryKey: ['playlistTracks', playlist.id],
    queryFn: async () => {
      if (playlist) return await getPlaylistTracks(playlist.id);
    },
    getNextPageParam: (lastPage, allPages) => lastPage?.next,
  });

  if (isLoading || isFetching) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Error occurred while fetching data.</Text>
      </View>
    );
  }

  return (
    <FlatList
      scrollEnabled
      contentContainerStyle={styles.listContainer}
      data={data?.items}
      renderItem={({item, index}) => {
        return <TrackItem item={item} key={item.track.id} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
    backgroundColor: 'red',
  },
});

export default TrackList;

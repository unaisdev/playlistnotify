import React from 'react';

import {FlatList, StyleSheet, View} from 'react-native';
import TrackItem from '../TrackItem';
import Text from '@app/features/commons/components/Text';

import {PlaylistItem, PlaylistModel} from '../../../../services/types';

interface Props {
  tracks: PlaylistItem[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  error: unknown;
}

const TrackList = ({
  tracks,
  fetchNextPage,
  hasNextPage,
  isLoading,
  error,
}: Props) => {
  const handleEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error occurred while fetching data.</Text>
      </View>
    );
  }

  return (
    <FlatList
      scrollEnabled
      contentContainerStyle={styles.listContainer}
      data={tracks}
      renderItem={({item, index}) => {
        //only getting tracks from Spotify API response
        //TODO: get all type of items: tracks / episodes https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks info at bottom page
        if (item.track) return <TrackItem item={item} key={item.track.id} />;
        else return <></>;
      }}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5} // Adjust as needed
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
  },
  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(TrackList);

import {FlatList, StyleSheet, Text} from 'react-native';
import {usePlaylist} from '../../../../features/commons/hooks/usePlaylist';
import {useQueries, useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../../../containers/userContext';
import {useCallback} from 'react';
import {getUserNotifiedPlaylists} from '../../../../services/user';
import {getPlaylist} from '../../../../services/playlist';
import {UserAddedPlaylistsResponse} from '../../../../services/types';
import PlaylistListItem from '../PlaylistListItem';

interface Props {
  savedPlaylistsInfo: UserAddedPlaylistsResponse[];
}

const PlaylistList = ({savedPlaylistsInfo}: Props) => {
  const {user} = useUserContext();

  return (
    <FlatList
      style={styles.container}
      data={savedPlaylistsInfo}
      renderItem={({item, index}) => {
        console.log(item.playlistId);
        if (!item) return <></>;
        return (
          <PlaylistListItem
            playlistId={item.playlistId}
            key={item.playlistId}
            savedPlaylistTracksIds={item.trackIds}
            index={index}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaylistList;

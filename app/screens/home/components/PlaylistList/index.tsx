import {FlatList, StyleSheet, Text} from 'react-native';
import {usePlaylist} from '../../../playlist/components/TrackList/hooks/usePlaylist';
import {useQueries, useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../../../containers/userContext';
import {useCallback} from 'react';
import {getUserNotifiedPlaylists} from '../../../../services/user';
import PlaylistItem from '../PlaylistItem';
import {getPlaylist} from '../../../../services/playlist';
import {UserAddedPlaylistsResponse} from '../../../../services/types';

interface Props {
  savedPlaylistsInfo: UserAddedPlaylistsResponse[];
}

const PlaylistList = ({savedPlaylistsInfo}: Props) => {
  const {user} = useUserContext();

  const userPlaylistQueries = useQueries({
    queries: savedPlaylistsInfo.map(notifiedPlaylist => {
      return {
        queryKey: ['notifiedPlaylist', notifiedPlaylist.playlistId],
        queryFn: () => getPlaylist(notifiedPlaylist.playlistId),
      };
    }),
  });

  return (
    <FlatList
      style={styles.container}
      data={userPlaylistQueries}
      renderItem={({item, index}) => {
        const savedPlaylistTracksIds = savedPlaylistsInfo
          .filter(itemFilter => itemFilter.playlistId === item.data?.id)
          .flatMap(itemFlat => itemFlat.trackIds);

        if (!item.data) return <></>;
        return (
          <PlaylistItem
            playlist={item.data}
            key={index}
            savedPlaylistTracksIds={savedPlaylistTracksIds}
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

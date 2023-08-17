import {FlatList, StyleSheet, Text} from 'react-native';

import PlaylistListItem from '../PlaylistListItem';

import {UserAddedPlaylistsResponse} from '../../../../services/types';

import {useUserContext} from '../../../../containers/userContext';
import {getUserNotifiedPlaylists} from '../../../../services/user';

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

import React from 'react';

import {View} from 'react-native';

import PlaylistList from './components/PlaylistList';
import BottomSheetUpdatedPlaylist from '../../features/commons/bottomSheet';

import {useUserNotifiedPlaylists} from '../../features/commons/hooks/useUserNotifiedPlaylists';
import {useBottomSheetContext} from '../../containers/bottomSheetContext';
import {fetchUserProfile} from '../../features/commons/hooks/useUser';

const HomeScreen = () => {
  const {user} = fetchUserProfile();
  const {userNotifiedPlaylists} = useUserNotifiedPlaylists();
  const {ref, handlePresentModalPress} = useBottomSheetContext();

  if (!userNotifiedPlaylists) return;

  return (
    <View style={{flex: 1}}>
      <PlaylistList savedPlaylistsInfo={userNotifiedPlaylists} />
      <BottomSheetUpdatedPlaylist ref={ref} />
    </View>
  );
};

export default HomeScreen;

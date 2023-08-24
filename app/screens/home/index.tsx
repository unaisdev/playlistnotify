import React, {useEffect} from 'react';

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import PlaylistList from './components/PlaylistList';
import BottomSheetUpdatedPlaylist from '../../features/commons/bottomSheet';

import {useUserNotifiedPlaylists} from '../../features/commons/hooks/useUserNotifiedPlaylists';
import {useBottomSheetContext} from '../../containers/bottomSheetContext';
import i18n from '@app/services/i18next';

const HomeScreen = () => {
  const {userNotifiedPlaylists} = useUserNotifiedPlaylists();
  const {ref} = useBottomSheetContext();

  if (!userNotifiedPlaylists)
    return (
      <View style={[styles.loadingContainer]}>
        <Text style={styles.loadingText}>
          {i18n.t('loading_notified_playlists')}
        </Text>
        <ActivityIndicator />
      </View>
    );

  if (userNotifiedPlaylists.length === 0)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          ¡No tienes ninguna playlist añadida!
        </Text>
      </View>
    );

  return (
    <View style={{flex: 1}}>
      <PlaylistList savedPlaylistsInfo={userNotifiedPlaylists} />
      <BottomSheetUpdatedPlaylist ref={ref} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {maxWidth: 300, textAlign: 'center'},
});

export default HomeScreen;

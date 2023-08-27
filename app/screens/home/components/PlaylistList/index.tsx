import React, {LegacyRef, RefObject, useRef} from 'react';

import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';

import PlaylistListItem from '../PlaylistListItem';


import {useUserContext} from '../../../../containers/userContext';
import SwipeableItem from '../PlaylistListItem/components/SwipableItem';
import {useUserNotifiedPlaylists} from '@app/features/commons/hooks/useUserNotifiedPlaylists';
import i18n from '@app/services/i18next';
import Text from '@app/features/commons/layout/Text';
import {usePlaylistAllTracks} from '@app/features/commons/hooks/usePlaylistAllTracks';

const PlaylistList = () => {
  const {user} = useUserContext();
  const {
    userNotifiedPlaylists,
    refetchUserNotifiesPlaylists,
    isLoading,
    isRefetching,
  } = useUserNotifiedPlaylists();

  const refetch = () => {
    refetchUserNotifiesPlaylists();
  };

  if (isLoading)
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
        <Image
          style={{
            width: '80%',
            height: '40%',
            objectFit: 'contain',
            borderRadius: 20,
            backgroundColor: 'gray',
          }}
          source={require('../../../../assets/images/no_playlists_for_notify.jpg')}
        />
        <Text style={styles.noDataText}>
          ¡No tienes ninguna playlist añadida!
        </Text>
        <Text style={styles.noDataDesc}>
          Para poder notificarte sobre la actualización de una lista de
          reproducción, primero deberás de activar las notificaciones en alguna
          lista. Puedes acceder a tu perfil en la parte superior derecha, o ir
          al buscador en la parte inferior. Selecciona una lista de la que
          quieras recibir notificaciones cuando se actualiza, y dicha lista
          aparecerá aqui.
        </Text>
      </View>
    );

  console.log('render');

  return (
    <FlatList
      style={styles.container}
      data={userNotifiedPlaylists}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      renderItem={({item, index}) => (
        <SwipeableItem item={item} key={item.id}>
          <PlaylistListItem
            index={index}
            playlistId={item.playlistId}
            savedPlaylistTracksIds={item.trackIds}
          />
        </SwipeableItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
  },
  loadingText: {maxWidth: 300, textAlign: 'center'},
  noDataText: {maxWidth: 300, textAlign: 'left', fontWeight: '700'},
  noDataDesc: {maxWidth: 400, textAlign: 'left', fontWeight: '400'},
});

export default PlaylistList;

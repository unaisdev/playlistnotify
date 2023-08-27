import React, {LegacyRef, RefObject, useRef} from 'react';

import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import PlaylistListItem from '../PlaylistListItem';

import {UserAddedPlaylistsResponse} from '../../../../services/types';

import {useUserContext} from '../../../../containers/userContext';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableProps} from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import FlatlistLeftActions from './FlatlistLeftAction';
import {removePlaylistForNotify} from '@app/services/playlist';
import SwipeableItem from '../PlaylistListItem/components/SwipableItem';
import {useUserNotifiedPlaylists} from '@app/features/commons/hooks/useUserNotifiedPlaylists';
import i18n from '@app/services/i18next';
import Text from '@app/features/commons/layout/Text';

const PlaylistList = () => {
  const {user} = useUserContext();
  const {userNotifiedPlaylists, refetchUserNotifiesPlaylists, isRefetching} =
    useUserNotifiedPlaylists();

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

  console.log('render');

  return (
    <FlatList
      style={styles.container}
      data={userNotifiedPlaylists}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetchUserNotifiesPlaylists}
        />
      }
      renderItem={({item, index}) => (
        <SwipeableItem item={item} key={item.id} index={index} />
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {maxWidth: 300, textAlign: 'center'},
});

export default PlaylistList;

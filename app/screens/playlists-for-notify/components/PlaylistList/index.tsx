import React, {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import PlaylistListItem from '../PlaylistListItem';
import SwipeableItem from '../PlaylistListItem/components/SwipableItem';
import {UserAddedPlaylistsResponse} from '../../../../services/types';
import Text from '@app/commons/layout/Text';
import {useUserNotifiedPlaylists} from '@app/commons/hooks/useUserNotifiedPlaylists';
import Layout from '@app/commons/layout/TabLayout';
import Monicon from '@monicon/native';
import {PoweredBySpotify} from '@app/commons/components/PoweredBySpotify';

const defaultPlaylist = {
  id: '4OYwdvuAT2msLdqmNVUQD4',
  image_url: 'https://i.scdn.co/image/ab67706c0000bebbe90f0c084516e558ffab5594',
  name: 'holAloh',
};

const PlaylistList = () => {
  const {
    userNotifiedPlaylists,
    isLoading,
    isRefetching,
    refetchUserNotifiesPlaylists,
  } = useUserNotifiedPlaylists();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Animated.FlatList
      style={styles.container}
      data={userNotifiedPlaylists}
      contentContainerStyle={{flexGrow: 1}}
      scrollEnabled
      // itemLayoutAnimation={Layout.duration(500).delay(500)}
      keyExtractor={(item, index) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetchUserNotifiesPlaylists}
        />
      }
      renderItem={({
        item,
        index,
      }: {
        item: UserAddedPlaylistsResponse;
        index: number;
      }) => {
        return (
          <PlaylistListItem
            index={index}
            playlistId={item.playlistId}
            savedPlaylistTracksIds={item.trackIds}
            isRefetching={isRefetching}
          />
        );
      }}
      ListEmptyComponent={() => {
        return (
          <Layout>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefetching}
                  onRefresh={refetchUserNotifiesPlaylists}
                />
              }
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
                marginHorizontal: 20,
                rowGap: 48,
              }}
              style={styles.nodataContainer}>
              <View style={{rowGap: 12}}>
                <Text style={styles.noDataText}>
                  ¿Todavía no has seleccionado ninguna lista para que te
                  notifiquemos?
                </Text>

                <Text style={styles.noDataDesc}>
                  Para poder notificarte sobre la actualización de una lista de
                  reproducción, primero deberás de seleccionar alguna.
                </Text>
                <Text>
                  Accede desde tu foto de perfil a tus playlists, en la parte
                  superior derecha, o utiliza el buscador para encontrar una en
                  concreto.
                </Text>
                {/* <View style={styles.inline}>
              <Text>Puedes probar con esta: </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Playlist', {id: defaultPlaylist.id});
                }}>
                <PlaylistInfo
                  id={defaultPlaylist.id}
                  image_url={defaultPlaylist.image_url}
                  name={defaultPlaylist.name}
                />
              </TouchableOpacity>
            </View> */}
                <View style={styles.inline}>
                  <Text style={{flex: 1}}>
                    Marca el icono de notificación en la cabecera de las listas
                    de reproducción.
                  </Text>
                  <View
                    style={[
                      styles.inline,
                      {flex: 1, justifyContent: 'center'},
                    ]}>
                    <Monicon
                      name="material-symbols:notifications-off-outline-rounded"
                      size={24}
                      color={'gray'}
                    />
                    <Monicon
                      name="material-symbols:arrow-right-alt"
                      size={24}
                      color={'gray'}
                    />
                    <Monicon
                      name="material-symbols:notifications-active-rounded"
                      size={24}
                      color={'gray'}
                    />
                  </View>
                </View>
              </View>
              <PoweredBySpotify />
            </ScrollView>
          </Layout>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  nodataContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  loadingText: {maxWidth: 300, textAlign: 'center'},
  noDataText: {
    maxWidth: 300,
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 16,
  },
  noDataDesc: {maxWidth: 400, textAlign: 'left', fontWeight: '400'},
});

export default PlaylistList;

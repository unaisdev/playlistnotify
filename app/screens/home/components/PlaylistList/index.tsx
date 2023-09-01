import React, {
  LegacyRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Image,
  Keyboard,
  ScrollView,
} from 'react-native';

import PlaylistListItem from '../PlaylistListItem';

import {User, UserAddedPlaylistsResponse} from '../../../../services/types';

import {useUserContext} from '../../../../containers/userContext';
import SwipeableItem from '../PlaylistListItem/components/SwipableItem';
import {useUserNotifiedPlaylists} from '@app/features/commons/hooks/useUserNotifiedPlaylists';
import i18n from '@app/features/locales/i18next';
import Text from '@app/features/commons/layout/Text';
import {usePlaylistAllTracks} from '@app/features/commons/hooks/usePlaylistAllTracks';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOutRight,
  Layout,
  LayoutAnimationType,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {removePlaylistForNotify} from '@app/services/playlist';
import {useHome} from '../../hooks';

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<UserAddedPlaylistsResponse>,
);

const PlaylistList = () => {
  const {t} = useTranslation();
  const {isLoading, isRefetching, refetch, userNotifiedPlaylists} = useHome();

  const showAlert = (item: UserAddedPlaylistsResponse) =>
    Alert.alert(
      'Confirmar Acción',
      '¿Estás seguro de que deseas realizar esta acción?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Acción cancelada'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            await removePlaylistForNotify(item.playlistId, item.userId);
            refetch();
            // swipableRef?.current?.close();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );

  useEffect(() => {
    if (userNotifiedPlaylists)
      userNotifiedPlaylists.map(item => console.log(item.playlistId));
  }, [userNotifiedPlaylists]);

  if (isLoading)
    return (
      <View style={[styles.loadingContainer]}>
        <Text style={styles.loadingText}>
          {t('loading_notified_playlists')}
        </Text>
        <ActivityIndicator />
      </View>
    );

  if (userNotifiedPlaylists?.length === 0)
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

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={{flex: 1}}
      data={userNotifiedPlaylists}
      itemLayoutAnimation={Layout.duration(1000).delay(1000)}
      keyExtractor={(item, index) => item.id}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      renderItem={({
        item,
        index,
      }: {
        item: UserAddedPlaylistsResponse;
        index: number;
      }) => {
        return (
          <Animated.View
            entering={FadeInLeft.duration(1000).delay(index * 200)}
            exiting={FadeOutRight.duration(1000)}>
            <SwipeableItem onSwipped={() => showAlert(item)}>
              <PlaylistListItem
                index={index}
                playlistId={item.playlistId}
                savedPlaylistTracksIds={item.trackIds}
                isRefetching={isRefetching}
              />
            </SwipeableItem>
          </Animated.View>
        );
      }}
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

    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {maxWidth: 300, textAlign: 'center'},
  noDataText: {maxWidth: 300, textAlign: 'left', fontWeight: '700'},
  noDataDesc: {maxWidth: 400, textAlign: 'left', fontWeight: '400'},
});

export default PlaylistList;

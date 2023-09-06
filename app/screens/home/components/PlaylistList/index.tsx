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

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PlaylistInfo from '@app/screens/profile/components/SavedSpotifyLists/PlaylistInfo';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@app/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<UserAddedPlaylistsResponse>,
);

const defaultPlaylist = {
  id: '4OYwdvuAT2msLdqmNVUQD4',
  image_url: 'https://i.scdn.co/image/ab67706c0000bebbe90f0c084516e558ffab5594',
  name: 'holAloh',
};

const PlaylistList = () => {
  const {t} = useTranslation();
  const {isLoading, isRefetching, refetch, userNotifiedPlaylists} = useHome();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
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
            ¿Todavía no has seleccionado ninguna lista para que te notifiquemos?
          </Text>

          <Text style={styles.noDataDesc}>
            Para poder notificarte sobre la actualización de una lista de
            reproducción, primero deberás de seleccionar alguna.
          </Text>
          <Text>
            Accede desde tu foto de perfil a tus playlists, en la parte superior
            derecha, o utiliza el buscador para encontrar una en concreto.
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
              Marca el icono de notificación en la cabecera de las listas de
              reproducción.
            </Text>
            <View style={[styles.inline, {flex: 1, justifyContent: 'center'}]}>
              <MaterialIcon name="notifications-off" size={24} color={'gray'} />
              <MaterialIcon name="arrow-right-alt" size={24} color={'gray'} />
              <MaterialIcon
                name="notifications-active"
                size={24}
                color={'black'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );

  return (
    <Animated.FlatList
      style={styles.container}
      data={userNotifiedPlaylists}
      scrollEnabled
      itemLayoutAnimation={Layout.duration(500).delay(500)}
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
          <SwipeableItem onSwipped={() => showAlert(item)}>
            <PlaylistListItem
              index={index}
              playlistId={item.playlistId}
              savedPlaylistTracksIds={item.trackIds}
              isRefetching={isRefetching}
            />
          </SwipeableItem>
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

import React, {useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import Animated, {Layout} from 'react-native-reanimated';
import {Alert, RefreshControl, StyleSheet} from 'react-native';

import {RootStackParamList} from '@app/navigation';
import {useNavigation} from '@react-navigation/native';
import {removePlaylistForNotify} from '@app/services/playlist';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import PlaylistListItem from '../PlaylistListItem';
import SwipeableItem from '../PlaylistListItem/components/SwipableItem';
import {UserAddedPlaylistsResponse} from '../../../../services/types';

const defaultPlaylist = {
  id: '4OYwdvuAT2msLdqmNVUQD4',
  image_url: 'https://i.scdn.co/image/ab67706c0000bebbe90f0c084516e558ffab5594',
  name: 'holAloh',
};

type Props = {
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  userNotifiedPlaylists: UserAddedPlaylistsResponse[];
};

const PlaylistList = ({
  isLoading,
  isRefetching,
  refetch,
  userNotifiedPlaylists,
}: Props) => {
  const {t} = useTranslation();
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

  return (
    <Animated.FlatList
      style={styles.container}
      data={userNotifiedPlaylists}
      contentContainerStyle={{flex: 1}}
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

import React, {useEffect, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

import Text from '@app/commons/layout/Text';
import {useTheme} from '@app/commons/theme/hooks/useTheme';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';

import SkeletonItem from './components/SkeletonItem';
import Monicon from '@monicon/native';
import {QUERY_KEYS} from '@app/lib/queryKeys';
import {queryClient} from '@app/lib/react-query';
import SwipeableItem from './components/SwipableItem';
import {useRemoveNotify} from '@app/commons/hooks/useNotifyPlaylist';
import {usePlaylistAllTracks} from '@app/commons/hooks/usePlaylistAllTracks';
import {usePlaylist} from '@app/commons/hooks/usePlaylist';
import {useBottomSheetContext} from '@app/containers/BottomSheetHomeContext';

interface Props {
  playlistId: string;
  savedPlaylistTracksIds: string[];
  index: number;
  isRefetching: boolean;
}

const PlaylistListItem = ({
  playlistId,
  savedPlaylistTracksIds,
  index,
  isRefetching,
}: Props) => {
  const {tracks, hasNextPage} = usePlaylistAllTracks(playlistId);
  const {data: playlist, isLoading} = usePlaylist({playlistId: playlistId});
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();
  const {handlePresentModalPress, compareAllData} = useBottomSheetContext();

  const {mutateAsync: removePlaylistForNotify} = useRemoveNotify(playlistId);

  useEffect(() => {
    if (isRefetching) {
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.playlistTracks(playlistId),
        exact: true,
      });
    }
  }, [isRefetching, playlistId]);

  const showAlert = () =>
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
            await removePlaylistForNotify();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );

  const onPress = () => {
    if (playlist && tracksUpdate) {
      compareAllData(playlist, tracksUpdate);
    } else return;

    setTimeout(() => {
      if (
        tracksUpdate?.resultDeleted.length === 0 &&
        tracksUpdate.resultNew.length === 0
      )
        return;

      handlePresentModalPress();
    }, 400);
  };

  const tracksUpdate = useMemo(() => {
    if (!hasNextPage) {
      const resultNew = tracks.filter(item1 => {
        return !savedPlaylistTracksIds.some(item2 => {
          if (!item2 || !item1.track) {
            return true;
          }

          return item1.track.id === item2;
        });
      });

      const resultDeleted = savedPlaylistTracksIds.filter(item1 => {
        return !tracks.some(item2 => {
          if (!item1 || !item2.track) {
            return true;
          }

          return item1 === item2.track.id;
        });
      });

      return {
        resultNew,
        resultDeleted,
      };
    }
  }, [tracks]);

  const hasAddedOrDeleted = useMemo(() => {
    const hasnotAddedTracks = tracksUpdate?.resultNew.length === 0;
    const hasnotDeletedTracks = tracksUpdate?.resultDeleted.length === 0;

    if (hasnotAddedTracks && hasnotDeletedTracks) {
      return {opacity: 0.4};
    }

    return {opacity: 1};
  }, [tracksUpdate]);

  if (!playlist) return <SkeletonItem />;

  if (!tracksUpdate) return <SkeletonItem />;

  return (
    <SwipeableItem onSwipped={showAlert}>
      <Animated.View
        key={playlist.id}
        entering={FadeInLeft.duration(500).delay(index * 200)}
        exiting={FadeOutRight.duration(500)}
        layout={Layout.duration(1000)}>
        <TouchableOpacity onPress={onPress} style={hasAddedOrDeleted}>
          <View style={styles.container}>
            <Image
              source={{
                uri:
                  playlist.images[0].url ?? DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK,
              }}
              width={86}
              height={86}
            />

            <View style={styles.infoContainer}>
              <View style={styles.inlineBetween}>
                <Text style={styles.title} numberOfLines={2}>
                  {playlist.name}
                </Text>
              </View>
              {tracksUpdate.resultNew.length === 0 &&
              tracksUpdate.resultDeleted.length === 0 ? (
                <View style={styles.inline}>
                  <Text>{t('no_tracks_new_or_deleted')}</Text>
                </View>
              ) : (
                <View style={styles.inlineBetween}>
                  <View style={styles.inline}>
                    <Monicon
                      name="nrk:media-playlist-add"
                      size={18}
                      color={isDarkMode ? 'white' : 'black'}
                    />
                    <Text style={{fontSize: 12}}>
                      {tracksUpdate.resultNew.length}{' '}
                      {t('tracks_added').toLowerCase()}
                    </Text>
                  </View>
                  <View style={styles.inline}>
                    <Monicon
                      name="nrk:media-playlist-remove"
                      size={18}
                      color={isDarkMode ? 'white' : 'black'}
                    />
                    <Text style={{fontSize: 12}}>
                      {tracksUpdate.resultDeleted.length}{' '}
                      {t('tracks_deleted').toLowerCase()}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </SwipeableItem>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
    height: 86,
    // backgroundColor: 'red',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    maxWidth: 240,
    // backgroundColor: 'red',
  },
  lastAct: {
    opacity: 0.4,
    fontSize: 10,
  },
  inlineBetween: {
    flexGrow: 1,
    // backgroundColor: 'purple',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inline: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  infoContainer: {
    padding: 8,
    flexGrow: 1,
    // backgroundColor: 'gray',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default React.memo(PlaylistListItem);

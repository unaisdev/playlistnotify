import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from '@app/features/commons/layout/Text';

import Animated, {
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

import BottomSheetUpdatedPlaylist from '../../../../features/commons/bottomSheet';
import Octicons from 'react-native-vector-icons/Octicons';

import {useBottomSheetContext} from '../../../../containers/bottomSheetContext';
import {usePlaylistAllTracks} from '../../../../features/commons/hooks/usePlaylistAllTracks';
import {usePlaylist} from '../../../../features/commons/hooks/usePlaylist';
import NotifyMeButton from '@app/features/commons/header/components/NotifyMeButton';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';
import i18n from '@app/features/locales/i18next';

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
  const {tracks, hasNextPage, refetch} = usePlaylistAllTracks(playlistId);
  const {data: playlist} = usePlaylist({playlistId: playlistId});

  const {handlePresentModalPress, compareAllData} = useBottomSheetContext();

  useEffect(() => {
    refetch();
  }, [isRefetching]);

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
          return item1.track.id === item2;
        });
      });

      const resultDeleted = savedPlaylistTracksIds.filter(item1 => {
        return !tracks.some(item2 => {
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

  if (!tracksUpdate)
    return (
      <View style={{height: 86, backgroundColor: 'red', marginVertical: 8}}>
        <Text>{i18n.t('simple_loading')}</Text>
      </View>
    );

  if (!playlist)
    return (
      <View style={{height: 86, backgroundColor: 'red', marginVertical: 8}}>
        <Text>{i18n.t('simple_loading')}</Text>
      </View>
    );

  return (
    <TouchableOpacity onPress={onPress} style={hasAddedOrDeleted}>
      <Animated.View
        style={styles.container}
        entering={FadeInLeft.duration(800).delay(index * 300)}
        exiting={FadeOutRight.duration(800)}
        layout={Layout.duration(1200).delay(1600)}>
        <Image
          source={{
            uri: playlist.images[0].url ?? DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK,
          }}
          width={86}
          height={86}
        />

        <View style={styles.infoContainer}>
          <View style={styles.inlineBetween}>
            <Text style={styles.tittle} numberOfLines={2}>
              {playlist.name}
            </Text>
          </View>
          {tracksUpdate.resultNew.length === 0 &&
          tracksUpdate.resultDeleted.length === 0 ? (
            <View style={styles.inline}>
              <Text>{i18n.t('no_tracks_new_or_deleted')}</Text>
            </View>
          ) : (
            <View style={styles.inlineBetween}>
              <View style={styles.inline}>
                <Octicons name="diff-added" size={12} color={'black'} />
                <Text style={{fontSize: 12}}>
                  {tracksUpdate.resultNew.length}{' '}
                  {i18n.t('tracks_added').toLowerCase()}
                </Text>
              </View>
              <View style={styles.inline}>
                <Octicons name="diff-removed" size={12} color={'black'} />
                <Text style={{fontSize: 12}}>
                  {tracksUpdate.resultDeleted.length}{' '}
                  {i18n.t('tracks_deleted').toLowerCase()}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
    height: 86,
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tittle: {
    maxWidth: 240,
    // backgroundColor: 'red',
  },
  lastAct: {
    opacity: 0.4,
    fontSize: 10,
  },
  inlineBetween: {
    display: 'flex',
    flexGrow: 1,
    // backgroundColor: 'purple',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inline: {
    display: 'flex',
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  infoContainer: {
    padding: 8,
    flexGrow: 1,
    // backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default React.memo(PlaylistListItem);

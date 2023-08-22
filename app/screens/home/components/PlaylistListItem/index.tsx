import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Animated, {
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

import PlaylistSeenButton from '../PlaylistSeenButton';
import BottomSheetUpdatedPlaylist from '../../../../features/commons/bottomSheet';

import {useBottomSheetContext} from '../../../../containers/bottomSheetContext';
import {useAllPlaylistTracks} from '../../../../features/commons/hooks/useAllPlaylistTracks';
import {usePlaylist} from '../../../../features/commons/hooks/usePlaylist';
import NotifyMeButton from '@app/features/commons/header/components/NotifyMeButton';

interface Props {
  playlistId: string;
  savedPlaylistTracksIds: string[];
  index: number;
}

const PlaylistListItem = ({
  playlistId,
  savedPlaylistTracksIds,
  index,
}: Props) => {
  const {tracks, hasNextPage} = useAllPlaylistTracks(playlistId);
  const {data: playlist} = usePlaylist({playlistId: playlistId});

  const {handlePresentModalPress, compareAllData} = useBottomSheetContext();

  const onPress = () => {
    if (playlist && tracksUpdate) {
      compareAllData(playlist, tracksUpdate);
    } else return;
    setTimeout(() => {
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

  if (!tracksUpdate)
    return (
      <View style={{height: 86, backgroundColor: 'red', marginVertical: 8}}>
        <Text>Cargando...</Text>
      </View>
    );

  if (!playlist)
    return (
      <View style={{height: 86, backgroundColor: 'red', marginVertical: 8}}>
        <Text>Cargando...</Text>
      </View>
    );

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={styles.container}
        entering={FadeInLeft.duration(800).delay(index * 300)}
        exiting={FadeInLeft.duration(800)}
        layout={Layout.duration(800).delay(800)}>
        <Image
          source={{uri: playlist.images[0].url ?? ''}}
          width={86}
          height={86}
        />

        <View style={styles.infoContainer}>
          <View style={styles.inlineBetween}>
            <Text style={styles.tittle} numberOfLines={2}>
              {playlist.name}
            </Text>

            {/* <NotifyMeButton id={playlist.id} /> */}
          </View>
          <View style={{maxWidth: '80%'}}>
            <Text>ADD: {tracksUpdate.resultNew.length}</Text>
            <Text>removed: {tracksUpdate.resultDeleted.length}</Text>
            {/* <Text style={styles.lastAct}>
              Última actualización: hace dos horas
            </Text> */}
            {/* <PlaylistSeenButton /> */}
          </View>
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
    flexGrow: 1,
    display: 'flex',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoContainer: {
    flexGrow: 1,
    // backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default React.memo(PlaylistListItem);

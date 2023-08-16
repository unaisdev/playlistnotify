import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacityComponent,
  View,
} from 'react-native';
import {
  PlaylistItem,
  PlaylistModel,
  UserAddedPlaylistsResponse,
} from '../../../../services/types';
import {usePlaylist} from '../../../../features/commons/hooks/usePlaylist';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPlaylistTracks} from '../../../../services/playlist';
import NotifyMeButton from '../../../../features/commons/header/NotifyMeButton';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import {useAllPlaylistTracks} from '../../../../features/commons/hooks/useAllPlaylistTracks';
import {TouchableOpacity} from 'react-native';
import PlaylistSeenButton from '../PlaylistSeenButton';
import BottomSheetUpdatedPlaylist from '../../../../features/commons/bottomSheet';
import {useBottomSheetContext} from '../../../../containers/bottomSheetContext';

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
            <Text>{playlist.name}</Text>
            <NotifyMeButton id={playlist.id} />
          </View>
          <View style={{maxWidth: '80%'}}>
            <PlaylistSeenButton />
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
  inlineBetween: {
    flexGrow: 1,
    display: 'flex',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flexGrow: 1,
    // backgroundColor: 'gray',
    gap: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default React.memo(PlaylistListItem);

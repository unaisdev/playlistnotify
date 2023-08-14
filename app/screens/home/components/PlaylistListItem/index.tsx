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

  if (!playlist) return;

  return (
    <TouchableOpacity>
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
        <View>
          <Text>{playlist.name}</Text>
          <NotifyMeButton id={playlist.id} />

          <Text>
            AÑADIDAS:{' '}
            {JSON.stringify(
              tracksUpdate?.resultNew.map(item => item.track.name),
            )}
          </Text>
          <Text>
            ELIMINADOS:{' '}
            {JSON.stringify(tracksUpdate?.resultDeleted.map(item => item))}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    gap: 8,
    marginVertical: 8,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default React.memo(PlaylistListItem);

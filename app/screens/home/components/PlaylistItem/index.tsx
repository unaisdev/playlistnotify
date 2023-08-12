import {Image, StyleSheet, Text, View} from 'react-native';
import {
  PlaylistModel,
  UserAddedPlaylistsResponse,
} from '../../../../services/types';
import {usePlaylist} from '../../../playlist/components/TrackList/hooks/usePlaylist';
import React, {useCallback, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPlaylistTracks} from '../../../../services/playlist';
import {useAllPlaylistTracks} from '../../../../features/commons/header/NotifyMeButton/hooks/useAllPlaylistTracks';
import NotifyMeButton from '../../../../features/commons/header/NotifyMeButton';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutRight,
} from 'react-native-reanimated';

interface Props {
  playlist: PlaylistModel;
  savedPlaylistTracksIds: string[];
}

const PlaylistItem = ({playlist, savedPlaylistTracksIds}: Props) => {
  const {tracks, hasNextPage} = useAllPlaylistTracks(playlist.id);

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
    } else {
      return {
        resultNew: [],
        resultDeleted: [],
      };
    }
  }, [tracks]);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInLeft.duration(800)}
      exiting={FadeInLeft.duration(800)}>
      <Image
        source={{uri: playlist.images[0].url ?? ''}}
        width={86}
        height={86}
      />
      <View>
        <Text>{playlist.name}</Text>
        <NotifyMeButton id={playlist.id} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default React.memo(PlaylistItem);

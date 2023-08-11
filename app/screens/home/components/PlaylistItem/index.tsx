import {Text, View} from 'react-native';
import {
  PlaylistModel,
  UserAddedPlaylistsResponse,
} from '../../../../services/types';
import {usePlaylist} from '../../../playlist/components/TrackList/hooks/usePlaylist';
import React, {useCallback, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPlaylistTracks} from '../../../../services/playlist';
import {useAllPlaylistTracks} from '../../../../features/commons/header/NotifyMeButton/hooks/useAllPlaylistTracks';

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
    <View>
      <Text>{playlist.name}</Text>
      {/* {tracks?.map(item => (
        <Text style={{marginLeft: 12}}>{item.track.name}</Text>
      ))} */}
      {tracksUpdate?.resultNew?.map(item => (
        <Text key={item.track.id} style={{marginLeft: 12, color: 'green'}}>
          {JSON.stringify(item.track.id)}
        </Text>
      ))}
      {tracksUpdate?.resultDeleted?.map((item, index) => (
        <Text key={item + index} style={{marginLeft: 12, color: 'red'}}>
          {JSON.stringify(item)}
        </Text>
      ))}
    </View>
  );
};

export default React.memo(PlaylistItem);

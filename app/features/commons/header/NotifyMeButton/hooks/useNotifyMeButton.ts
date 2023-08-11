import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {usePlaylist} from '../../../../../screens/playlist/components/TrackList/hooks/usePlaylist';
import {useTrackList} from '../../../../../screens/playlist/components/TrackList/hooks/useTrackList';
import {
  getPlaylistTracks,
  isSavedPlaylistForNotify,
  removePlaylistForNotify,
  savePlaylistForNotify,
} from '../../../../../services/playlist';
import {useMemo, useState} from 'react';
import {PlaylistItem} from '../../../../../services/types';
import {useUserContext} from '../../../../../containers/userContext';
import {useAllPlaylistTracks} from './useAllPlaylistTracks';

export const useNotifyMeButton = (playlistId: string) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const {tracks, hasNextPage} = useAllPlaylistTracks(playlistId);
  const {user} = useUserContext();

  const iconProps = useMemo(() => {
    if (isSaved)
      return {
        color: 'black',
        iconName: 'notifications-active',
      };

    return {
      color: 'gray',
      iconName: 'notifications-off',
    };
  }, [isSaved]);

  const checkPlaylistForNotify = async () => {
    if (user) {
      const isSaved = await isSavedPlaylistForNotify(playlistId, user?.id);
      setIsSaved(isSaved ?? false);
    }
  };

  const togglePlaylistSave = async () => {
    if (user) {
      if (!isSaved) {
        setLoading(true);

        if (!hasNextPage)
          await savePlaylistForNotify(playlistId, tracks, user?.id);

        setLoading(false);
        setIsSaved(true);
        return;
      }

      await removePlaylistForNotify(playlistId, user?.id);
      setIsSaved(false);
    }
  };

  return {
    isSaved,
    loading,
    canSavePlaylist: hasNextPage,
    checkPlaylistForNotify,
    togglePlaylistSave,
    iconProps,
  };
};

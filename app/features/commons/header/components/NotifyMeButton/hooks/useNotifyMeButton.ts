import React, {useMemo, useState} from 'react';

import {
  isSavedPlaylistForNotify,
  removePlaylistForNotify,
  savePlaylistForNotify,
} from '../../../../../services/playlist';
import {useUserContext} from '../../../../../containers/userContext';
import {useAllPlaylistTracks} from '../../../hooks/useAllPlaylistTracks';

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
      setLoading(true); // Show loading indicator

      try {
        if (!isSaved) {
          // Always save the playlist, regardless of hasNextPage
          await savePlaylistForNotify(playlistId, tracks, user?.id);
          setIsSaved(true);
        } else {
          await removePlaylistForNotify(playlistId, user?.id);
          setIsSaved(false);
        }
      } catch (error) {
        console.error('Error saving/removing playlist:', error);
      }

      setLoading(false); // Hide loading indicator
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

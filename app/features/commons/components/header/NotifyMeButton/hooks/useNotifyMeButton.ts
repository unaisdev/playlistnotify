import React, {useEffect, useMemo, useState} from 'react';

import {useUserContext} from '@app/containers/UserContext';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {usePlaylistAllTracks} from '@app/features/commons/hooks/usePlaylistAllTracks';
import {
  isSavedPlaylistForNotify,
  removePlaylistForNotify,
  savePlaylistForNotify,
} from '@app/services/playlist';

export const useNotifyMeButton = (playlistId: string) => {
  const {isDarkMode} = useTheme();

  const [isSaved, setIsSaved] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [checkingSaved, setCheckingSaved] = useState(false);
  const {tracks, hasNextPage} = usePlaylistAllTracks(playlistId);
  const {user} = useUserContext();

  const checkPlaylistForNotify = async () => {
    if (user) {
      setCheckingSaved(true);
      const isSaved = await isSavedPlaylistForNotify(playlistId, user?.id);
      setIsSaved(isSaved ?? false);
      setCheckingSaved(false);
      return isSaved;
    }
  };

  useEffect(() => {
    const init = async () => {
      const isSaved = await checkPlaylistForNotify();
      setIsSaved(isSaved ?? false);
    };

    init();
  }, []);

  const iconProps = useMemo(() => {
    if (isSaved)
      return {
        color: isDarkMode ? 'white' : 'black',
        iconName: 'material-symbols:notifications-active-rounded',
      };

    return {
      color: 'gray',
      iconName: 'material-symbols:notifications-off-outline-rounded',
    };
  }, [isSaved]);

  const togglePlaylistSave = async () => {
    if (user) {
      setLoadingToggle(true); // Show loading indicator

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

      setLoadingToggle(false); // Hide loading indicator
    }
  };

  return {
    loadingToggle,
    checkingSaved,
    iconProps,
    canSavePlaylist: hasNextPage,
    checkPlaylistForNotify,
    togglePlaylistSave,
  };
};

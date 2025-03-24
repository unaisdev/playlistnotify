import {useMemo} from 'react';
import {useUserContext} from '@app/containers/UserContext';
import {useTheme} from '@app/commons/theme/hooks/useTheme';
import {usePlaylistAllTracks} from '@app/commons/hooks/usePlaylistAllTracks';
import {useToggleNotify} from '@app/commons/hooks/useToggleNotify';

export const useNotifyMeButton = (playlistId: string) => {
  const {isDarkMode} = useTheme();
  const {tracks, hasNextPage} = usePlaylistAllTracks(playlistId);

  const {toggleNotify, isSaved, checkingSaved, loadingToggle} =
    useToggleNotify(playlistId);

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
  }, [isSaved, isDarkMode]);

  const togglePlaylistSave = async () => {
    toggleNotify(tracks);
  };

  return {
    loadingToggle,
    checkingSaved,
    iconProps,
    canSavePlaylist: hasNextPage,
    isSaved,
    togglePlaylistSave,
  };
};

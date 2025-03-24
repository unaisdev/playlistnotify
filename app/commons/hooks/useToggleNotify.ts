import {
  useNotifyStatus,
  useSaveNotify,
  useRemoveNotify,
} from './useNotifyPlaylist';
import {PlaylistItem} from '@app/services/types';

export const useToggleNotify = (playlistId: string) => {
  const {data: isSaved = false, isLoading: checkingSaved} =
    useNotifyStatus(playlistId);

  const {mutate: saveNotify, isLoading: loadingSave} =
    useSaveNotify(playlistId);

  const {mutate: removeNotify, isLoading: loadingRemove} =
    useRemoveNotify(playlistId);

  const toggleNotify = (tracks: PlaylistItem[]) => {
    if (isSaved) {
      removeNotify();
    } else {
      saveNotify({tracks});
    }
  };

  return {
    toggleNotify,
    isSaved,
    checkingSaved,
    loadingToggle: loadingSave,
  };
};

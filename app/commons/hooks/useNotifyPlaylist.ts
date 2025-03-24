import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  removePlaylistForNotify,
  savePlaylistForNotify,
  isSavedPlaylistForNotify,
} from '@app/services/playlist';
import {PlaylistItem, UserAddedPlaylistsResponse} from '@app/services/types';
import {QUERY_KEYS} from '@app/lib/queryKeys';
import {useUserContext} from '@app/containers/UserContext';

export const useNotifyStatus = (playlistId: string) => {
  const {user} = useUserContext();

  return useQuery({
    queryKey: QUERY_KEYS.NOTIFY.playlist(playlistId, user?.id),
    queryFn: () => isSavedPlaylistForNotify(playlistId, user?.id ?? ''),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useSaveNotify = (playlistId: string) => {
  const {user} = useUserContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({tracks}: {tracks: PlaylistItem[]}) => {
      if (!user?.id) throw new Error('User ID is required');
      // Actualización optimista inmediata
      return savePlaylistForNotify(playlistId, tracks, user?.id);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        QUERY_KEYS.NOTIFY.playlist(playlistId, user?.id),
        true,
      );
      queryClient.refetchQueries([QUERY_KEYS.USER_NOTIFIED_PLAYLISTS]);
    },
    onError: () => {
      queryClient.setQueryData(
        QUERY_KEYS.NOTIFY.playlist(playlistId, user?.id),
        false,
      );
    },
  });
};

export const useRemoveNotify = (playlistId: string) => {
  const {user} = useUserContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User ID is required');
      queryClient.setQueryData(
        QUERY_KEYS.NOTIFY.playlist(playlistId, user?.id),
        false,
      );

      return removePlaylistForNotify(playlistId, user?.id);
    },
    onSuccess: () => {
      console.log(
        'onsuccedss',
        queryClient.getQueryData([QUERY_KEYS.USER_NOTIFIED_PLAYLISTS]),
      );

      queryClient.setQueryData<UserAddedPlaylistsResponse[]>(
        [QUERY_KEYS.USER_NOTIFIED_PLAYLISTS],
        oldData =>
          oldData?.filter(item => item.playlistId !== playlistId) ?? [],
      );
    },
    onError: () => {
      console.log('onError');

      queryClient.setQueryData(
        QUERY_KEYS.NOTIFY.playlist(playlistId, user?.id),
        true,
      );

      queryClient.setQueryData<UserAddedPlaylistsResponse[]>(
        [QUERY_KEYS.USER_NOTIFIED_PLAYLISTS],
        oldData =>
          oldData?.filter(item => item.playlistId !== playlistId) ?? [],
      );
    },
  });
};

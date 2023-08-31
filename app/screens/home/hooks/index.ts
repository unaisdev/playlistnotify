import {useUserNotifiedPlaylists} from '@app/features/commons/hooks/useUserNotifiedPlaylists';
import {UserAddedPlaylistsResponse} from '@app/services/types';
import {useEffect, useMemo, useState} from 'react';

export function useHome() {
  const {
    userNotifiedPlaylists,
    refetchUserNotifiesPlaylists,
    isLoading,
    isRefetching,
  } = useUserNotifiedPlaylists();

  const userNotifyLists = useMemo(() => {
    if (userNotifiedPlaylists) {
      return userNotifiedPlaylists;
    }
  }, [userNotifiedPlaylists]);

  return {
    userNotifiedPlaylists: userNotifyLists,
    refetch: refetchUserNotifiesPlaylists,
    isLoading,
    isRefetching,
  };
}

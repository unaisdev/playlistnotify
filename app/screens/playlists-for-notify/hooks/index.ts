import {useMemo} from 'react';

import {useUserNotifiedPlaylists} from '@app/features/commons/hooks/useUserNotifiedPlaylists';

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

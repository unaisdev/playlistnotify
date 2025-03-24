import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {QUERY_KEYS} from '@app/lib/queryKeys';
import {getUserNotifiedPlaylists} from '@app/services/user';
import {useUserContext} from '@app/containers/UserContext';

export const useUserNotifiedPlaylists = () => {
  const {user} = useUserContext();

  const getNotifiedPlaylists = async () => {
    if (user) {
      const fetchedPlaylists = await getUserNotifiedPlaylists(user.id);

      if (fetchedPlaylists) return fetchedPlaylists;
    }

    return [];
  };

  const {data, refetch, isRefetching, isLoading} = useQuery({
    queryKey: [QUERY_KEYS.USER_NOTIFIED_PLAYLISTS],
    queryFn: getNotifiedPlaylists,
    enabled: !!user, // Start the query only when user is available
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 30 * 60 * 1000, // 30 minutos
    // refetchOnWindowFocus: true,
  });

  return {
    userNotifiedPlaylists: data,
    isLoading,
    refetchUserNotifiesPlaylists: refetch,
    isRefetching,
  };
};

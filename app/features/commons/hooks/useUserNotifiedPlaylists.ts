import {useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../../containers/userContext';
import {getUserNotifiedPlaylists} from '../../../services/user';
import {useEffect} from 'react';

export const useUserNotifiedPlaylists = () => {
  const {user} = useUserContext();

  const getNotifiedPlaylists = async () => {
    if (user) {
      const fetchedPlaylists = await getUserNotifiedPlaylists(user.id);

      if (fetchedPlaylists) return fetchedPlaylists;
    }
  };

  const {data, refetch, isRefetching, isLoading} = useQuery({
    queryKey: ['userPlaylists'],
    queryFn: getNotifiedPlaylists,
    enabled: !!user, // Start the query only when user is available
    keepPreviousData: true,
  });

  return {
    userNotifiedPlaylists: data,
    isLoading,
    refetchUserNotifiesPlaylists: refetch,
    isRefetching,
  };
};

import {useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../../containers/userContext';
import {getUserNotifiedPlaylists} from '../../../services/user';
import {useEffect} from 'react';

export const useUserNotifiedPlaylists = () => {
  const {user, userNotifiedPlaylists, setUserNotifiedPlaylists} =
    useUserContext();

  const getPlaylists = async () => {
    if (user) {
      const fetchedPlaylists = await getUserNotifiedPlaylists(user.id);

      if (fetchedPlaylists) return fetchedPlaylists;
    }
  };

  const {data, refetch, isRefetching, isLoading} = useQuery({
    queryKey: ['userPlaylists'],
    queryFn: getPlaylists,
    enabled: !!user, // Start the query only when user is available
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) setUserNotifiedPlaylists(data);
  }, [data]);

  return {
    userNotifiedPlaylists,
    isLoading,
    refetchUserNotifiesPlaylists: refetch,
    isRefetching,
  };
};

import {useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../../containers/userContext';
import {getUserNotifiedPlaylists} from '../../../services/user';

export const useUserNotifiedPlaylists = () => {
  const {user} = useUserContext();

  const getPlaylists = async () => {
    if (user) {
      const fetchedPlaylists = await getUserNotifiedPlaylists(user.id);

      if (fetchedPlaylists) return fetchedPlaylists;
    }
  };

  const {data, refetch, isRefetching} = useQuery({
    queryKey: ['userPlaylists'],
    queryFn: getPlaylists,
    enabled: !!user, // Start the query only when user is available
    keepPreviousData: true,
  });

  return {
    userNotifiedPlaylists: data,
    refetchUserNotifiesPlaylists: refetch,
    isRefetching,
  };
};

import {useMutation, useQuery} from '@tanstack/react-query';
import {useCallback, useEffect} from 'react';
import {useUserContext} from '../../../containers/userContext';
import {
  getUserProfile,
  getUserNotifiedPlaylists,
  registerUser,
} from '../../../services/user';
import {savePlaylistForNotify} from '../../../services/playlist';

export const useUserNotifiedPlaylists = () => {
  const {setUser} = useUserContext();

  //TODO: hook
  const {
    data: user,
    isLoading,
    error,
    failureReason,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
  });

  const getPlaylists = useCallback(async () => {
    if (user) {
      const fetchedPlaylists = await getUserNotifiedPlaylists(user.id);

      if (fetchedPlaylists) return fetchedPlaylists;
      return [];
    }
    return [];
  }, []);

  const CONFIG = {
    queryKey: ['userPlaylists'],
    queryFn: getPlaylists,
    enabled: !!user, // Start the query only when user is available
  };

  const userNotifiedPlaylistsQuery = useQuery({
    queryKey: ['userPlaylists'],
    queryFn: getPlaylists,
    enabled: !!user, // Start the query only when user is available
    keepPreviousData: true,
    refetchInterval: 1000,  
  });

  useEffect(() => {
    if (user) {
      registerUser(user);
      setUser(user);
    }
  }, [user]);

  const userNotifiedPlaylists = userNotifiedPlaylistsQuery.data;

  return {
    userNotifiedPlaylists,
  };
};

import {useMutation, useQuery} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import {useUserContext} from '../../../containers/userContext';
import {
  getUserProfile,
  getUserNotifiedPlaylists,
  registerUser,
} from '../../../services/user';
import {UserAddedPlaylistsResponse} from '../../../services/types';

export const useUserNotifiedPlaylists = () => {
  const {user} = useUserContext();

  const getPlaylists = async () => {
    if (user) {
      const fetchedPlaylists = await getUserNotifiedPlaylists(user.id);

      if (fetchedPlaylists) return fetchedPlaylists;
    }
  };

  const userNotifiedPlaylistsQuery = useQuery({
    queryKey: ['userPlaylists'],
    queryFn: getPlaylists,
    enabled: !!user, // Start the query only when user is available
    keepPreviousData: true,
  });

  const userNotifiedPlaylists = userNotifiedPlaylistsQuery.data;

  return {
    userNotifiedPlaylists,
  };
};

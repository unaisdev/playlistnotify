import {useUserContext} from '@app/containers/userContext';
import {PlaylistModel} from '@app/services/types';
import {getUserPlaylists} from '@app/services/user';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export function useProfile() {
  const {user} = useUserContext();

  const {data, isLoading} = useQuery({
    queryKey: ['userSpotifyPlaylists'],
    queryFn: () => getUserPlaylists(),
    retry: 3,
  });

  return {
    user,
    userPlaylists: data,
    isLoading,
  };
}

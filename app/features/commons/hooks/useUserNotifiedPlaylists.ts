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
  const [userNotifiedPlaylists, setUserNotifiedPlaylists] = useState<
    UserAddedPlaylistsResponse[]
  >([]);
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

  useEffect(() => {
    if (userNotifiedPlaylistsQuery.data)
      setUserNotifiedPlaylists(userNotifiedPlaylistsQuery.data);
  }, [userNotifiedPlaylistsQuery.data]);

  // Function to add a playlist to userNotifiedPlaylists
  const addUserNotifiedPlaylist = (newPlaylist: UserAddedPlaylistsResponse) => {
    console.log('adding to notify: ' + newPlaylist);
    setUserNotifiedPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
  };

  // Function to remove a playlist from userNotifiedPlaylists
  const removeUserNotifiedPlaylist = (playlistId: string) => {
    setUserNotifiedPlaylists(prevPlaylists =>
      prevPlaylists.filter(playlist => playlist.playlistId !== playlistId),
    );
  };

  return {
    userNotifiedPlaylists,
    addUserNotifiedPlaylist,
    removeUserNotifiedPlaylist,
  };
};

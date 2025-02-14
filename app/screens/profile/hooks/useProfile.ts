import {
  SORTED_TYPE_KEYS,
  useProfileContext,
} from '@app/containers/ProfileContext';
import {useUserContext} from '@app/containers/UserContext';
import {PlaylistModel, UserAddedPlaylistsResponse} from '@app/services/types';
import {getUserPlaylists} from '@app/services/user';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';

const orderListAlphabetically = (list: PlaylistModel[]) => {
  const sortedList = [...list];
  sortedList.sort((a, b) => {
    // Compare playlist names (alphabetically)
    const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return sortedList; // Update playlists with the sorted array
};

const groupPlaylistsByOwnerList = (list: PlaylistModel[]) => {
  const sortedList = [...list];
  sortedList.sort((a, b) => {
    // Compare owner names to group by owner
    const ownerNameA = a.owner.display_name.toUpperCase();
    const ownerNameB = b.owner.display_name.toUpperCase();
    if (ownerNameA < ownerNameB) return -1;
    if (ownerNameA > ownerNameB) return 1;
    return 0;
  });

  // Update the state with the sorted array
  return sortedList;
};

const orderListBased = (list: PlaylistModel[], sortedType: string) => {
  switch (sortedType) {
    case SORTED_TYPE_KEYS.ALPHABETICAL:
      return orderListAlphabetically(list);
    case SORTED_TYPE_KEYS.CREATED_BY:
      return groupPlaylistsByOwnerList(list);
    default:
      return list;
  }
};

export function useProfile() {
  const {user} = useUserContext();

  const {data, isLoading} = useQuery({
    queryKey: ['userSpotifyPlaylists'],
    queryFn: () => getUserPlaylists(),
    retry: true,
  });

  const {
    ref,
    sortedType,
    userPlaylists,
    setUserPlaylists,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
  } = useProfileContext();

  useEffect(() => {
    if (user) if (data) setUserPlaylists(data);
  }, [data, user]);

  const playlists = useMemo(() => {
    if (data) return data;
    return [];
  }, [data]);

  const filterAll = () => {
    console.log('filtering all');
    if (playlists) setUserPlaylists(playlists);
  };

  const filterOwnPlaylists = () => {
    const ownPlaylists = playlists.filter(playlist =>
      playlist.owner.display_name.includes(user?.display_name ?? ''),
    );

    setUserPlaylists(orderListBased(ownPlaylists, sortedType));
  };

  const filterSpotifyPlaylists = () => {
    const spotifyPlaylists = playlists.filter(playlist =>
      playlist.owner.display_name.includes('Spotify'),
    );

    setUserPlaylists(orderListBased(spotifyPlaylists, sortedType));
  };

  const filterMaxTracksNum = (maxTracks: number) => {
    setUserPlaylists(playlists.filter(list => list.tracks.total < maxTracks));
  };

  const orderRecent = () => {
    setUserPlaylists(playlists);
  };

  const groupPlaylistsByOwner = () => {
    setUserPlaylists(groupPlaylistsByOwnerList(userPlaylists));
  };

  const orderAlphabetically = () => {
    setUserPlaylists(orderListAlphabetically(userPlaylists));
  };

  return {
    ref,
    sortedType,
    user,
    userPlaylists,
    setUserPlaylists,
    filterAll,
    filterMaxTracksNum,
    filterOwnPlaylists,
    filterSpotifyPlaylists,
    groupPlaylistsByOwner,
    handleCloseModalPress,
    handlePresentModalPress,
    handleSheetChanges,
    orderAlphabetically,
    orderRecent,
    isLoading,
  };
}

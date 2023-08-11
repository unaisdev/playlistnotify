import React, {useCallback, useEffect, useState} from 'react';

import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  getUserNotifiedPlaylists,
  getUserPlaylists,
  getUserProfile,
  registerUser,
} from '../../services/user';
import {useUserContext} from '../../containers/userContext';
import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import {
  PlaylistResponse,
  UserAddedPlaylistsResponse,
} from '../../services/types';
import {usePlaylist} from '../playlist/components/TrackList/hooks/usePlaylist';
import PlaylistList from './components/PlaylistList';

const HomeScreen = () => {
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
  }, [user]);

  const CONFIG = {
    queryKey: ['userPlaylists'],
    queryFn: getPlaylists,
    enabled: !!user, // Start the query only when user is available
  };

  const userPlaylistsQuery = useQuery({
    queryKey: ['userPlaylists'],
    queryFn: getPlaylists,
    enabled: !!user,
    refetchInterval: 1000, // Start the query only when user is available
  });

  useEffect(() => {
    if (user) {
      registerUser(user);
      setUser(user);
    }
  }, [user]);

  if (!userPlaylistsQuery.data) return;

  return <PlaylistList savedPlaylistsInfo={userPlaylistsQuery.data} />;
};

export default HomeScreen;

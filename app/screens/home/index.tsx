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
import {usePlaylist} from '../../features/commons/hooks/usePlaylist';
import PlaylistList from './components/PlaylistList';
import {useUserNotifiedPlaylists} from '../../features/commons/hooks/useUserNotifiedPlaylists';
import {fetchUserProfile} from '../../features/commons/hooks/useUser';

const HomeScreen = () => {
  const {user} = fetchUserProfile();
  const {userNotifiedPlaylists} = useUserNotifiedPlaylists();

  if (!userNotifiedPlaylists) return;

  userNotifiedPlaylists.map(item => console.log(item.playlistId));

  return <PlaylistList savedPlaylistsInfo={userNotifiedPlaylists} />;
};

export default HomeScreen;

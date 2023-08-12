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
import {useUserNotifiedPlaylists} from './hooks/useUserNotifiedPlaylists';

const HomeScreen = () => {
  const {userNotifiedPlaylists} = useUserNotifiedPlaylists();

  if (!userNotifiedPlaylists) return;

  return <PlaylistList savedPlaylistsInfo={userNotifiedPlaylists} />;
};

export default HomeScreen;

import React, {useCallback, useMemo, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '@app/features/commons/layout/Text';
import {PlaylistModel} from '../../services/types';
import {useUserContext} from '../../containers/userContext';
import {getUserPlaylists} from '../../services/user';
import {useProfile} from './hooks/useProfile';
import i18n from '@app/features/locales/i18next';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FilterLists from './components/FilterLists';
import {usePlaylist} from '@app/features/commons/hooks/usePlaylist';
import SearchList from '../search/components/searchList';
import PlaylistList from './components/PlaylistList';
import OrderBy from './components/OrderBy';

const ProfileScreen = () => {
  const {user, userPlaylists, isLoading} = useProfile();
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);

  const {t} = useTranslation();

  // Use useMemo to memoize userPlaylists and update playlists only when it changes
  useMemo(() => {
    if (userPlaylists) {
      setPlaylists(userPlaylists);
    }
  }, [userPlaylists]);

  if (!user) return null;

  if (!userPlaylists) return null;

  const ownPlaylists = userPlaylists.filter(playlist =>
    playlist.owner.display_name.includes(user.display_name),
  );

  const spotifyPLaylists = userPlaylists.filter(playlist =>
    playlist.owner.display_name.includes('Spotify'),
  );

  const filterOwnPlaylists = () => {
    setPlaylists(ownPlaylists);
  };

  const filterSpotifyPlaylists = () => {
    setPlaylists(spotifyPLaylists);
  };

  const filterMaxTracksNum = (maxTracks: number) => {
    setPlaylists(
      userPlaylists.filter(playlist => playlist.tracks.total < maxTracks),
    );
  };

  return (
    <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
      <FilterLists
        filterAll={() => setPlaylists(userPlaylists)}
        filterOwnPlaylists={filterOwnPlaylists}
        filterSpotifyPlaylists={filterSpotifyPlaylists}
        filterByTracksNum={filterMaxTracksNum}
      />
      <PlaylistList profilePlaylists={playlists} />
    </Layout>
  );
};

export default ProfileScreen;

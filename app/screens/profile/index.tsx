import React, {useCallback, useMemo} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '@app/features/commons/layout/Text';

import {PlaylistModel} from '../../services/types';

import {useUserContext} from '../../containers/userContext';
import {useEffect, useState} from 'react';
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

const ProfileScreen = () => {
  const {user, userPlaylists, isLoading} = useProfile();
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);

  const {t} = useTranslation();

  useEffect(() => {
    if (userPlaylists) {
      setPlaylists(userPlaylists); // Inicializa playlists con userPlaylists cuando esté disponible
    }
  }, [userPlaylists]);

  if (!user) return;

  if (!userPlaylists) return;

  // Función genérica de filtro
  const applyFilter = (filterFn: (playlist: PlaylistModel) => boolean) => {
    setPlaylists(userPlaylists.filter(filterFn));
  };

  // Filtrar listas de reproducción del usuario
  const filterOwnPlaylists = () => {
    applyFilter(playlist =>
      playlist.owner.display_name.includes(user.display_name),
    );
  };

  // Filtrar listas de reproducción de Spotify
  const filterSpotifyPlaylists = () => {
    applyFilter(playlist => playlist.owner.display_name.includes('Spotify'));
  };

  // Filtrar por número máximo de pistas
  const filterMaxTracksNum = (maxTracks: number) => {
    applyFilter(playlist => playlist.tracks.total < maxTracks);
  };

  return (
    <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
      <FilterLists
        filterAll={() => setPlaylists(userPlaylists)}
        filterOwnPlaylists={filterOwnPlaylists}
        filterSpotifyPlaylists={filterSpotifyPlaylists}
        filterByTracksNum={filterMaxTracksNum}
      />
      <PlaylistList searchResults={playlists} />
    </Layout>
  );
};

export default ProfileScreen;

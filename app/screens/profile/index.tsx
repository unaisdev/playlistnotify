import React, {useEffect, useMemo, useRef, useState} from 'react';

import {useTranslation} from 'react-i18next';

import Layout from '@app/commons/layout/TabLayout';
import BottomSheetProfile from '@app/commons/components/BottomSheetFor';
import {useProfileContext} from '@app/containers/ProfileContext';

import OrderBy from './components/OrderBy';
import {useProfile} from './hooks/useProfile';
import FilterLists from './components/FilterLists';
import {PlaylistModel} from '../../services/types';
import PlaylistList from './components/PlaylistList';
import BottomSheetProfileFooter from './components/BottomSheetFooter';
import BottomSheetProfileContent from './components/BottomSheetContent';
import {ActivityIndicator, View} from 'react-native';

const ProfileScreen = () => {
  const [selectedDisplay, setSelectedDisplay] = useState('row');
  const {
    ref,
    isLoading,
    handlePresentModalPress,
    user,
    userPlaylists,
    setUserPlaylists,
    filterAll,
    filterMaxTracksNum,
    filterOwnPlaylists,
    filterSpotifyPlaylists,
    groupPlaylistsByOwner,
    orderAlphabetically,
    orderRecent,
  } = useProfile();

  const {t} = useTranslation();

  const snapPoints = useMemo(() => ['38%'], []);

  if (!user) return null;

  if (!userPlaylists) return null;

  const list = useMemo(() => {
    return [...userPlaylists];
  }, []);

  const toggleSelectedDisplay = () => {
    setSelectedDisplay(prev => {
      if (prev === 'row') return 'square';
      else return 'row';
    });
  };

  return (
    <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
      <FilterLists
        filterAll={filterAll}
        filterOwnPlaylists={filterOwnPlaylists}
        filterSpotifyPlaylists={filterSpotifyPlaylists}
        filterByTracksNum={filterMaxTracksNum}
      />
      <OrderBy
        selectedDisplay={selectedDisplay}
        toggleSelectedDisplay={toggleSelectedDisplay}
        handleBottomSheetOpen={handlePresentModalPress}
      />
      {isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <PlaylistList
          selectedDisplay={selectedDisplay}
          profilePlaylists={userPlaylists}
        />
      )}
      <BottomSheetProfile
        ref={ref}
        snapPoints={snapPoints}
        content={
          <BottomSheetProfileContent
            sortAlphabetical={orderAlphabetically}
            sortCreatedBy={groupPlaylistsByOwner}
            sortRecent={orderRecent}
          />
        }
      />
    </Layout>
  );
};

export default ProfileScreen;

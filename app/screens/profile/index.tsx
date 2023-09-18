import React, {useEffect, useMemo, useRef, useState} from 'react';

import {useTranslation} from 'react-i18next';

import Layout from '@app/features/commons/layout/TabLayout';
import BottomSheetProfile from '@app/features/commons/components/BottomSheetFor';
import {useProfileContext} from '@app/containers/ProfileContext';

import OrderBy from './components/OrderBy';
import {useProfile} from './hooks/useProfile';
import FilterLists from './components/FilterLists';
import {PlaylistModel} from '../../services/types';
import PlaylistList from './components/PlaylistList';
import BottomSheetProfileFooter from './components/BottomSheetFooter';
import BottomSheetProfileContent from './components/BottomSheetContent';

const ProfileScreen = () => {
  const {
    ref,
    handlePresentModalPress,
    userPlaylists,
    setUserPlaylists,
    user,
    filterMaxTracksNum,
    filterOwnPlaylists,
    filterSpotifyPlaylists,
    handleCloseModalPress,
    handleSheetChanges,
  } = useProfileContext();

  const {t} = useTranslation();

  const snapPoints = useMemo(() => ['38%'], []);

  if (!user) return null;

  if (!userPlaylists) return null;

  userPlaylists.map(item => console.log(item.name));

  const list = useMemo(() => {
    return [...userPlaylists];
  }, []);

  const orderRecent = () => {
    setUserPlaylists([...userPlaylists]);
  };

  const orderAlphabetically = () => {
    const sortedPlaylists = [...userPlaylists]; // Create a copy of the playlists array
    sortedPlaylists.sort((a, b) => {
      // Compare playlist names (alphabetically)
      const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setUserPlaylists(sortedPlaylists); // Update playlists with the sorted array
  };

  const groupPlaylistsByOwner = () => {
    const sorted = [...userPlaylists].sort((a, b) => {
      // Compare owner names to group by owner
      const ownerNameA = a.owner.display_name.toUpperCase();
      const ownerNameB = b.owner.display_name.toUpperCase();
      if (ownerNameA < ownerNameB) return -1;
      if (ownerNameA > ownerNameB) return 1;
      return 0;
    });

    // Update the state with the sorted array
    setUserPlaylists(sorted);
  };

  return (
    <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
      <FilterLists
        filterAll={() => setUserPlaylists(list)}
        filterOwnPlaylists={filterOwnPlaylists}
        filterSpotifyPlaylists={filterSpotifyPlaylists}
        filterByTracksNum={filterMaxTracksNum}
      />
      <OrderBy handleBottomSheetOpen={handlePresentModalPress} />
      <PlaylistList profilePlaylists={userPlaylists} />
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

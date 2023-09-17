import React, {useMemo, useRef, useState} from 'react';

import {useTranslation} from 'react-i18next';

import Layout from '@app/features/commons/layout/TabLayout';
import BottomSheetProfile from '@app/features/commons/components/BottomSheetFor';
import {
  BottomSheetProfileProvider,
  useBottomSheetProfileContext,
} from '@app/containers/BottomSheetProfileContext';

import OrderBy from './components/OrderBy';
import {useProfile} from './hooks/useProfile';
import FilterLists from './components/FilterLists';
import {PlaylistModel} from '../../services/types';
import PlaylistList from './components/PlaylistList';
import BottomSheetProfileFooter from './components/BottomSheetFooter';
import BottomSheetProfileContent from './components/BottomSheetContent';

const ProfileScreen = () => {
  const {user, userPlaylists, isLoading} = useProfile();
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const {ref, handlePresentModalPress} = useBottomSheetProfileContext();
  const {sortedType} = useBottomSheetProfileContext();

  const {t} = useTranslation();

  const snapPoints = useMemo(() => ['25%'], []);

  // Use useMemo to memoize userPlaylists and update playlists only when it changes
  useMemo(() => {
    if (userPlaylists) {
      setPlaylists(userPlaylists);
    }
  }, [userPlaylists]);

  if (!user) return null;

  if (!userPlaylists) return null;

  const ownPlaylists = useMemo(() => {
    return userPlaylists.filter(playlist =>
      playlist.owner.display_name.includes(user.display_name),
    );
  }, [userPlaylists]);

  const spotifyPLaylists = useMemo(() => {
    return userPlaylists.filter(playlist =>
      playlist.owner.display_name.includes('Spotify'),
    );
  }, [userPlaylists]);

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
      <BottomSheetProfileProvider>
        <FilterLists
          filterAll={() => setPlaylists(userPlaylists)}
          filterOwnPlaylists={filterOwnPlaylists}
          filterSpotifyPlaylists={filterSpotifyPlaylists}
          filterByTracksNum={filterMaxTracksNum}
        />
        <OrderBy handleBottomSheetOpen={handlePresentModalPress} />
        <PlaylistList profilePlaylists={playlists} />
        <BottomSheetProfile
          ref={ref}
          snapPoints={snapPoints}
          content={<BottomSheetProfileContent />}
          footer={props => <BottomSheetProfileFooter />}
        />
      </BottomSheetProfileProvider>
    </Layout>
  );
};

export default ProfileScreen;

import {useProfile} from '@app/screens/profile/hooks/useProfile';
import {PlaylistModel, User} from '@app/services/types';
import {getUserPlaylists} from '@app/services/user';
import BottomSheet from '@gorhom/bottom-sheet';
import {useQuery} from '@tanstack/react-query';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export const SORTED_TYPE_KEYS = {
  RECENT_ADDED: 'Recent',
  ALPHABETICAL: 'Alphabetical',
  CREATED_BY: 'Created',
};

export type SORTED_TYPE =
  (typeof SORTED_TYPE_KEYS)[keyof typeof SORTED_TYPE_KEYS];

type ContextType = {
  sortedType: SORTED_TYPE;
  user: User | undefined;
  ref: React.ForwardedRef<BottomSheet>;
  userPlaylists: PlaylistModel[];
  setUserPlaylists: (list: PlaylistModel[]) => void;
  setSorted: (sorted: SORTED_TYPE) => void;
  handlePresentModalPress: () => void;
  handleCloseModalPress: () => void;
  handleSheetChanges: (index: number) => void;
  orderRecent: () => void; // Nueva función
  orderAlphabetically: () => void; // Nueva función
  groupPlaylistsByOwner: () => void; // Nueva función
  filterOwnPlaylists: () => void; // Nueva función
  filterSpotifyPlaylists: () => void; // Nueva función
  filterMaxTracksNum: (maxTracks: number) => void; // Nueva función
};

export const ProfileContext = createContext<ContextType>({
  user: undefined,
  sortedType: SORTED_TYPE_KEYS.RECENT_ADDED,
  ref: null,
  userPlaylists: [],
  setUserPlaylists: (list: PlaylistModel[]) => ({}),
  setSorted: (sorted: SORTED_TYPE) => ({}),
  handlePresentModalPress: () => ({}),
  handleCloseModalPress: () => ({}),
  handleSheetChanges: (index: number) => ({}),
  orderRecent: () => {},
  orderAlphabetically: () => {},
  groupPlaylistsByOwner: () => {},
  filterOwnPlaylists: () => {},
  filterSpotifyPlaylists: () => {},
  filterMaxTracksNum: (maxTracks: number) => {},
});

export const ProfileProvider = ({children}: PropsWithChildren) => {
  const {user, userPlaylists} = useProfile();

  const [playlists, setUserPlaylists] = useState<PlaylistModel[]>([]);
  const [sortedType, setSortedType] = useState(SORTED_TYPE_KEYS.RECENT_ADDED);
  const bottomSheetModalRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (userPlaylists) setUserPlaylists(userPlaylists);
  }, [userPlaylists]);

  const setSorted = (sorted: SORTED_TYPE) => {
    setSortedType(sorted);
  };

  const setUserPlaylistsFiltered = (list: PlaylistModel[]) => {
    setUserPlaylists(list);
  };

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const orderRecent = () => {};

  const orderAlphabetically = () => {};

  const groupPlaylistsByOwner = () => {};

  const filterOwnPlaylists = () => {
    const ownPlaylists = userPlaylists?.filter(playlist =>
      playlist.owner.display_name.includes(user?.display_name ?? ''),
    );

    setUserPlaylists(ownPlaylists);
  };

  const filterSpotifyPlaylists = () => {
    const spotifyPLaylists = [...userPlaylists].filter(playlist =>
      playlist.owner.display_name.includes('Spotify'),
    );

    setUserPlaylists(spotifyPLaylists);
  };

  const filterMaxTracksNum = (maxTracks: number) => {
    setUserPlaylists(
      userPlaylists?.filter(playlist => playlist.tracks.total < maxTracks),
    );
  };

  return (
    <ProfileContext.Provider
      value={{
        user: user,
        sortedType: sortedType,
        ref: bottomSheetModalRef,
        userPlaylists: playlists ?? [],
        setUserPlaylists: setUserPlaylistsFiltered,
        setSorted: setSorted,
        handlePresentModalPress: handlePresentModalPress,
        handleCloseModalPress: handleCloseModalPress,
        handleSheetChanges: handleSheetChanges,
        orderRecent: orderRecent,
        orderAlphabetically: orderAlphabetically,
        groupPlaylistsByOwner: groupPlaylistsByOwner,
        filterOwnPlaylists: filterOwnPlaylists,
        filterSpotifyPlaylists: filterSpotifyPlaylists,
        filterMaxTracksNum: filterMaxTracksNum,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const {
    user,
    sortedType,
    ref,
    userPlaylists,
    setUserPlaylists,
    setSorted,
    handlePresentModalPress,
    handleCloseModalPress,
    handleSheetChanges,
    filterMaxTracksNum,
    filterOwnPlaylists,
    filterSpotifyPlaylists,
    groupPlaylistsByOwner,
    orderAlphabetically,
    orderRecent,
  } = useContext(ProfileContext);
  return {
    user,
    ref,
    sortedType,
    userPlaylists,
    setUserPlaylists,
    setSorted,
    handlePresentModalPress,
    handleCloseModalPress,
    handleSheetChanges,
    filterMaxTracksNum,
    filterOwnPlaylists,
    filterSpotifyPlaylists,
    groupPlaylistsByOwner,
    orderAlphabetically,
    orderRecent,
  };
};

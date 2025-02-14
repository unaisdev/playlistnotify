import {useProfile} from '@app/screens/profile/hooks/useProfile';
import {PlaylistModel, User} from '@app/services/types';
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
import {useUserContext} from '../UserContext';

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
 
});

export const ProfileProvider = ({children}: PropsWithChildren) => {
  const {user} = useUserContext();
  const [userPlaylists, setUserPlaylists] = useState<PlaylistModel[]>([]);
  const [sortedType, setSortedType] = useState(SORTED_TYPE_KEYS.RECENT_ADDED);
  const bottomSheetModalRef = useRef<BottomSheet>(null);

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


  return (
    <ProfileContext.Provider
      value={{
        user: user,
        sortedType: sortedType,
        ref: bottomSheetModalRef,
        userPlaylists: userPlaylists,
        setUserPlaylists: setUserPlaylistsFiltered,
        setSorted: setSorted,
        handlePresentModalPress: handlePresentModalPress,
        handleCloseModalPress: handleCloseModalPress,
        handleSheetChanges: handleSheetChanges,
      
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
  };
};

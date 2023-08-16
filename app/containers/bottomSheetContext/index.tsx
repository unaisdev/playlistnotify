import {createContext, useCallback, useContext, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {PlaylistItem, PlaylistModel} from '../../services/types';

export type TracksUpdated = {
  resultNew: PlaylistItem[];
  resultDeleted: string[];
};

const initialTracksUpdated = {
  resultNew: [],
  resultDeleted: [],
};

interface BottomSheetProps {
  compareAllData: (
    playlist: PlaylistModel,
    tracksUpdated: {
      resultNew: PlaylistItem[];
      resultDeleted: string[];
    },
  ) => void;
  handlePresentModalPress: () => void;
  handleCloseModalPress: () => void;
  handleSheetChanges: (index: number) => void;
}

type BottomSheetType = {
  ref: React.ForwardedRef<BottomSheet>;
  playlist: PlaylistModel | null;
  tracksUpdated: {
    resultNew: PlaylistItem[];
    resultDeleted: string[];
  };
};

type BottomSheetContextType = BottomSheetProps & BottomSheetType;

export const BottomSheetContext = createContext<BottomSheetContextType>({
  ref: null,
  playlist: null,
  tracksUpdated: {
    resultDeleted: [],
    resultNew: [],
  },
  handlePresentModalPress: () => ({}),
  handleCloseModalPress: () => ({}),
  handleSheetChanges: (index: number) => ({}),
  compareAllData: () => ({}),
});

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [tracksUpdated, setTracksUpdated] =
    useState<TracksUpdated>(initialTracksUpdated);
  const [playlist, setPlaylist] = useState<PlaylistModel | null>(null);

  const bottomSheetModalRef = useRef<BottomSheet>(null);

  const compareAllData = useCallback(
    (playlist: PlaylistModel, tracksUpdated: TracksUpdated) => {
      setPlaylist(playlist);
      setTracksUpdated(tracksUpdated);
    },
    [],
  );

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
    <BottomSheetContext.Provider
      value={{
        ref: bottomSheetModalRef,
        playlist: playlist,
        tracksUpdated: tracksUpdated,
        handlePresentModalPress: handlePresentModalPress,
        handleCloseModalPress: handleCloseModalPress,
        handleSheetChanges: handleSheetChanges,
        compareAllData: compareAllData,
      }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  const {
    ref,
    playlist,
    tracksUpdated,
    handlePresentModalPress,
    handleCloseModalPress,
    handleSheetChanges,
    compareAllData,
  } = useContext(BottomSheetContext);
  return {
    ref,
    playlist,
    tracksUpdated,
    handlePresentModalPress,
    handleCloseModalPress,

    handleSheetChanges,
    compareAllData,
  };
};

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

import {PlaylistItem, PlaylistModel} from '../../services/types';

export type TracksCompared = {
  resultNew: PlaylistItem[];
  resultDeleted: string[];
};

const initialTracksCompared = {
  resultNew: [],
  resultDeleted: [],
};

interface BottomSheetProps {
  compareAllData: (
    playlist: PlaylistModel,
    tracksCompared: TracksCompared,
  ) => void;
  handlePresentModalPress: () => void;
  handleCloseModalPress: () => void;
  handleSheetChanges: (index: number) => void;
}

type BottomSheetType = {
  ref: React.ForwardedRef<BottomSheet>;
  playlist: PlaylistModel | null;
  tracksCompared: TracksCompared;
};

type BottomSheetContextType = BottomSheetProps & BottomSheetType;

export const BottomSheetContext = createContext<BottomSheetContextType>({
  ref: null,
  playlist: null,
  tracksCompared: {
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
  const [tracksCompared, setTracksCompared] = useState<TracksCompared>(
    initialTracksCompared,
  );
  const [playlist, setPlaylist] = useState<PlaylistModel | null>(null);

  const bottomSheetModalRef = useRef<BottomSheet>(null);

  const compareAllData = useCallback(
    (playlist: PlaylistModel, tracksCompared: TracksCompared) => {
      setPlaylist(playlist);
      setTracksCompared(tracksCompared);
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
        tracksCompared: tracksCompared,
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
    tracksCompared,
    handlePresentModalPress,
    handleCloseModalPress,
    handleSheetChanges,
    compareAllData,
  } = useContext(BottomSheetContext);
  return {
    ref,
    playlist,
    tracksCompared,
    handlePresentModalPress,
    handleCloseModalPress,
    handleSheetChanges,
    compareAllData,
  };
};

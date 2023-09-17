import BottomSheet from '@gorhom/bottom-sheet';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

export const SORTED_TYPE_KEYS = {
  ALPHABETICAL: 'Alphabetical',
  CREATED_BY: 'Created',
};

export type SORTED_TYPE =
  (typeof SORTED_TYPE_KEYS)[keyof typeof SORTED_TYPE_KEYS];

type ContextType = {
  sortedType: SORTED_TYPE;
  ref: React.ForwardedRef<BottomSheet>;

  setSorted: (sorted: SORTED_TYPE) => void;
  handlePresentModalPress: () => void;
  handleCloseModalPress: () => void;
  handleSheetChanges: (index: number) => void;
};

export const BSProfileContext = createContext<ContextType>({
  sortedType: SORTED_TYPE_KEYS.ALPHABETICAL,
  ref: null,

  setSorted: (sorted: SORTED_TYPE) => ({}),
  handlePresentModalPress: () => ({}),
  handleCloseModalPress: () => ({}),
  handleSheetChanges: (index: number) => ({}),
});

export const BottomSheetProfileProvider = ({children}: PropsWithChildren) => {
  const [sortedType, setSortedType] = useState(SORTED_TYPE_KEYS.ALPHABETICAL);
  const bottomSheetModalRef = useRef<BottomSheet>(null);

  const setSorted = (sorted: SORTED_TYPE) => {
    setSortedType(sorted);
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
    <BSProfileContext.Provider
      value={{
        sortedType: sortedType,
        ref: bottomSheetModalRef,
        setSorted: setSorted,
        handlePresentModalPress: handlePresentModalPress,
        handleCloseModalPress: handleCloseModalPress,
        handleSheetChanges: handleSheetChanges,
      }}>
      {children}
    </BSProfileContext.Provider>
  );
};

export const useBottomSheetProfileContext = () => {
  const {
    sortedType,
    ref,
    setSorted,
    handlePresentModalPress,
    handleCloseModalPress,
    handleSheetChanges,
  } = useContext(BSProfileContext);
  return {
    ref,
    sortedType,
    setSorted,
    handlePresentModalPress,
    handleCloseModalPress,
    handleSheetChanges,
  };
};

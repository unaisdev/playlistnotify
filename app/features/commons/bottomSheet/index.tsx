import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, View} from 'react-native';
import {PlaylistItem, PlaylistModel} from '../../../services/types';
import {forwardRef, useCallback, useMemo, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useBottomSheetContext} from '../../../containers/bottomSheetContext';
import CustomBackdrop from './components/Backdrop';
import CustomFooter from './components/Footer';
import Content from './components/Content';
import {Easing} from 'react-native-reanimated';

interface Props {}

const BottomSheetUpdatedPlaylist = (
  {}: Props,
  ref: React.ForwardedRef<BottomSheet>,
) => {
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 550,
    easing: Easing.exp,
  });

  const snapPoints = useMemo(() => ['85%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={props => <CustomBackdrop {...props} />}
      containerStyle={styles.container}
      footerComponent={props => <CustomFooter {...props} />}
      enablePanDownToClose
      snapPoints={snapPoints}
      animationConfigs={animationConfigs}>
      <Content />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default forwardRef<BottomSheet, Props>(BottomSheetUpdatedPlaylist);

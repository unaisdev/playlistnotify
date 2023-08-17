import React, {forwardRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Easing} from 'react-native-reanimated';

import BottomSheet, {useBottomSheetTimingConfigs} from '@gorhom/bottom-sheet';
import CustomBackdrop from './components/Backdrop';
import CustomFooter from './components/Footer';
import Content from './components/Content';

import {useBottomSheetContext} from '../../../containers/bottomSheetContext';

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
  const {playlist, tracksUpdated} = useBottomSheetContext();

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={props => <CustomBackdrop {...props} />}
      containerStyle={styles.container}
      footerComponent={props => <CustomFooter {...props} playlist={playlist} />}
      enablePanDownToClose
      enableContentPanningGesture
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

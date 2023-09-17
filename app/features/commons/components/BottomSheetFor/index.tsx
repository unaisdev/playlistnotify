import React, {FC, forwardRef, useMemo} from 'react';

import {StyleSheet} from 'react-native';
import {Easing} from 'react-native-reanimated';

import BottomSheet, {
  BottomSheetFooterProps,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';

import CustomBackdrop from './components/Backdrop';

interface Props {
  snapPoints: string[];
  content: React.ReactNode;
  footer?: FC<BottomSheetFooterProps>;
}

const BottomSheetUpdatedPlaylist = (
  {content, footer, snapPoints}: Props,
  ref: React.ForwardedRef<BottomSheet>,
) => {
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 550,
    easing: Easing.exp,
  });

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={props => <CustomBackdrop {...props} />}
      footerComponent={footer}
      containerStyle={styles.container}
      animationConfigs={animationConfigs}
      enablePanDownToClose>
      {content}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default forwardRef<BottomSheet, Props>(BottomSheetUpdatedPlaylist);

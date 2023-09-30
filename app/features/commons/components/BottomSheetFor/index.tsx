import React, {FC, forwardRef, useMemo} from 'react';

import {Dimensions, StyleSheet} from 'react-native';
import {Easing} from 'react-native-reanimated';

import BottomSheet, {
  BottomSheetFooterProps,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';

import CustomBackdrop from './components/Backdrop';
import {useTheme} from '../../theme/hooks/useTheme';

interface Props {
  snapPoints?: string[];
  content: React.ReactNode;
  footer?: FC<BottomSheetFooterProps>;
}

const BottomSheetUpdatedPlaylist = (
  {content, footer, snapPoints}: Props,
  ref: React.ForwardedRef<BottomSheet>,
) => {
  const {isDarkMode} = useTheme();
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 550,
    easing: Easing.exp,
  });
  const {height} = Dimensions.get('window');

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing
      maxDynamicContentSize={height / 2}
      backdropComponent={props => <CustomBackdrop {...props} />}
      footerComponent={footer}
      containerStyle={styles.container}
      animationConfigs={animationConfigs}
      enablePanDownToClose
      backgroundStyle={{backgroundColor: isDarkMode ? 'black' : 'white'}}
      handleStyle={{
        backgroundColor: isDarkMode ? '#424242' : 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
      handleIndicatorStyle={{backgroundColor: isDarkMode ? 'black' : 'gray'}}>
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

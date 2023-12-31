import React from 'react';

import {StyleSheet} from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

const CustomBackdrop: React.FC<BottomSheetBackdropProps> = props => {
  return (
    <BottomSheetBackdrop
      {...props}
      opacity={0.5}
      enableTouchThrough={false}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={[styles.backdrop, StyleSheet.absoluteFillObject]}
    />
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});

export default CustomBackdrop;

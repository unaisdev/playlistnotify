import React, {PropsWithChildren} from 'react';
import {BottomSheetFooter, BottomSheetFooterProps} from '@gorhom/bottom-sheet';

type Props = PropsWithChildren & BottomSheetFooterProps;

const CustomFooter = ({animatedFooterPosition, children}: Props) => {
  return (
    <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
      {children}
    </BottomSheetFooter>
  );
};

export default CustomFooter;

import {PropsWithChildren, useRef} from 'react';

import {Swipeable} from 'react-native-gesture-handler';

import SwipeableLeftAction from './SwipeableLeftAction';

const SwipeableItem = ({
  children,
  onSwipped,
}: PropsWithChildren & {onSwipped: () => void}) => {
  const swipableRef = useRef<Swipeable | null>(null);

  return (
    <Swipeable
      ref={swipableRef}
      leftThreshold={60}
      enableTrackpadTwoFingerGesture
      onSwipeableOpen={onSwipped}
      renderLeftActions={props => <SwipeableLeftAction {...props} />}>
      {children}
    </Swipeable>
  );
};

export default SwipeableItem;

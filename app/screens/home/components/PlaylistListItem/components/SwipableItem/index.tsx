import {removePlaylistForNotify} from '@app/services/playlist';
import {PropsWithChildren, useRef} from 'react';
import {Alert} from 'react-native';
import PlaylistListItem from '../..';
import SwipeableLeftAction from './SwipeableLeftAction';
import {Swipeable} from 'react-native-gesture-handler';
import {UserAddedPlaylistsResponse} from '@app/services/types';

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
      renderLeftActions={props => (
        <SwipeableLeftAction {...props} />
      )}>
      {children}
    </Swipeable>
  );
};

export default SwipeableItem;

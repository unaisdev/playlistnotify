import {removePlaylistForNotify} from '@app/services/playlist';
import {PropsWithChildren, useRef} from 'react';
import {Alert} from 'react-native';
import PlaylistListItem from '../..';
import SwipeableLeftAction from './SwipeableLeftAction';
import {Swipeable} from 'react-native-gesture-handler';
import {UserAddedPlaylistsResponse} from '@app/services/types';

const SwipeableItem = ({
  children,
  item,
}: PropsWithChildren & {item: UserAddedPlaylistsResponse}) => {
  const swipableRef = useRef<Swipeable | null>(null);

  const showAlert = () =>
    Alert.alert(
      'Confirmar Acción',
      '¿Estás seguro de que deseas realizar esta acción?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Acción cancelada'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            removePlaylistForNotify(item.playlistId, item.userId);
            swipableRef?.current?.close();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );

  return (
    <Swipeable
      ref={swipableRef}
      leftThreshold={60}
      enableTrackpadTwoFingerGesture
      onSwipeableOpen={showAlert}
      renderLeftActions={props => (
        <SwipeableLeftAction playlistId={item.playlistId} {...props} />
      )}>
      {children}
    </Swipeable>
  );
};

export default SwipeableItem;

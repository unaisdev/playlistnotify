import {removePlaylistForNotify} from '@app/services/playlist';
import {useRef} from 'react';
import {Alert} from 'react-native';
import PlaylistListItem from '../..';
import FlatlistLeftActions from '../../../PlaylistList/FlatlistLeftAction';
import {Swipeable} from 'react-native-gesture-handler';
import {UserAddedPlaylistsResponse} from '@app/services/types';

type Props = {
  index: number;
  item: UserAddedPlaylistsResponse;
};

const SwipeableItem = ({index, item}: Props) => {
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

  if (!item) return <></>;
  return (
    <Swipeable
      ref={swipableRef}
      leftThreshold={60}
      enableTrackpadTwoFingerGesture
      onSwipeableOpen={showAlert}
      renderLeftActions={props => (
        <FlatlistLeftActions playlistId={item.playlistId} {...props} />
      )}>
      <PlaylistListItem
        playlistId={item.playlistId}
        key={item.playlistId}
        savedPlaylistTracksIds={item.trackIds}
        index={index}
      />
    </Swipeable>
  );
};

export default SwipeableItem;

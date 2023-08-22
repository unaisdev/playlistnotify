import React, {LegacyRef, RefObject, useRef} from 'react';

import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native';

import PlaylistListItem from '../PlaylistListItem';

import {UserAddedPlaylistsResponse} from '../../../../services/types';

import {useUserContext} from '../../../../containers/userContext';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableProps} from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import FlatlistLeftActions from './FlatlistLeftAction';
import {removePlaylistForNotify} from '@app/services/playlist';
import SwipeableItem from '../PlaylistListItem/components/SwipableItem';

interface Props {
  savedPlaylistsInfo: UserAddedPlaylistsResponse[];
}

const PlaylistList = ({savedPlaylistsInfo}: Props) => {
  const {user} = useUserContext();

  console.log('render');
  return (
    <FlatList
      style={styles.container}
      data={savedPlaylistsInfo}
      renderItem={({item, index}) => (
        <SwipeableItem item={item} key={item.id} index={index} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaylistList;

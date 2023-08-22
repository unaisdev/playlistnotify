import React from 'react';

import {FlatList, StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import PlaylistListItem from '../PlaylistListItem';

import {UserAddedPlaylistsResponse} from '../../../../services/types';

import {useUserContext} from '../../../../containers/userContext';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableProps} from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import FlatlistLeftActions from './FlatlistLeftAction';

interface Props {
  savedPlaylistsInfo: UserAddedPlaylistsResponse[];
}

const PlaylistList = ({savedPlaylistsInfo}: Props) => {
  const {user} = useUserContext();

  return (
    <FlatList
      style={styles.container}
      data={savedPlaylistsInfo}
      renderItem={({item, index}) => {
        console.log(item.playlistId);

        if (!item) return <></>;
        return (
          <Swipeable
            leftThreshold={60}
            enableTrackpadTwoFingerGesture
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
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaylistList;

import {Image, StyleSheet, Text, View} from 'react-native';
import {PlaylistItem} from '../../../../services/types';
import React from 'react';

interface Props {
  item: PlaylistItem;
}

const TrackItem = ({item}: Props) => {
  return (
    <View style={styles.item}>
      <Image source={{uri: item.track.album.images[0].url}} />
      <Text>{item.track.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inline: {},
});

export default React.memo(TrackItem);

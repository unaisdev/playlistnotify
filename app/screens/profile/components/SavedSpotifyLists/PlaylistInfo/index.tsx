import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Text from '@app/features/commons/layout/Text';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';

interface Props {
  id: string;
  image_url?: string;
  name: string;
}

const PlaylistInfo = ({id, image_url, name}: Props) => {
  return (
    <Animated.View style={styles.container}>
      {image_url ? (
        <Image source={{uri: image_url}} style={styles.image} />
      ) : (
        <Image
          source={{uri: DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK}}
          style={styles.image}
        />
      )}

      <Text style={styles.nameText} numberOfLines={2}>
        {name}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 96,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 96,
    height: 96,
    aspectRatio: 1 / 1,
  },
  nameText: {
    color: 'white',
    fontSize: 10,
  },
});

export default PlaylistInfo;

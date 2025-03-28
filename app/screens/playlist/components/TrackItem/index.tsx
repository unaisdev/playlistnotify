import React from 'react';

import {Image, StyleSheet, View} from 'react-native';

import Text from '@app/commons/layout/Text';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';

import {PlaylistItem} from '../../../../services/types';

interface Props {
  item: PlaylistItem;
}

const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60000); // Divide by 60000 to get minutes
  const seconds = Math.floor((duration % 60000) / 1000); // Get the remaining seconds

  // Format the minutes and seconds as two-digit numbers
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

const TrackItem = ({item}: Props) => {
  const artists = item.track.artists.map((artist, index) => {
    // Capitalize the first letter of each artist name
    const formattedName = artist.name
      ?.charAt(0)
      .toUpperCase()
      .concat(artist.name?.slice(1));

    // Separate artists with commas, except for the last one
    const separator = index === item.track.artists.length - 1 ? '' : ', ';

    return (
      <View key={artist.id}>
        <Text style={{fontSize: 10}}>
          {formattedName}
          {separator}
        </Text>
      </View>
    );
  });

  return (
    <View style={styles.item}>
      <View style={styles.inline}>
        <Image
          source={{
            uri:
              item.track.album.images[0]?.url ??
              DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK,
          }}
          style={styles.image}
        />
        <View style={{gap: 4}}>
          <Text style={{maxWidth: 260}}>{item.track.name}</Text>
          <Text numberOfLines={2} style={{maxWidth: 260}}>
            {artists}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{fontSize: 12}}>
          {formatDuration(item.track.duration_ms)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 6,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  image: {
    width: 46,
    height: 46,
    objectFit: 'contain',
  },
});

export default React.memo(TrackItem);

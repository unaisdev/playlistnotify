import {Dimensions, Image, StyleSheet, View} from 'react-native';

import Text from '@app/commons/layout/Text';
import {PlaylistItem, Track} from '@app/services/types';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';

type TracksListProps = {
  tracksDel?: Track[];
};

const DeletedTracks = ({tracksDel}: TracksListProps) => {
  return (
    <View>
      {tracksDel?.map((item, index) => {
        return (
          <View
            key={item.id}
            style={[
              styles.inlineCenter,
              {backgroundColor: 'red', paddingHorizontal: 12},
            ]}>
            <Image
              source={{
                uri:
                  item.album.images[0]?.url ??
                  DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK,
              }}
              width={40}
              height={40}
            />
            <Text>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  inlineCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
});

export default DeletedTracks;

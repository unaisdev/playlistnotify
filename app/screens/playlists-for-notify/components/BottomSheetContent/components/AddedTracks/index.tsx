import {Dimensions, Image, StyleSheet, View} from 'react-native';

import {PlaylistItem} from '@app/services/types';
import Text from '@app/features/commons/layout/Text';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';

type TracksListProps = {
  tracksNew?: PlaylistItem[];
};

const AddedTracks = ({tracksNew}: TracksListProps) => {
  return (
    <View style={{}}>
      {tracksNew?.map((item, index) => {
        return (
          <View
            key={item.track.id}
            style={[styles.inlineCenter, {backgroundColor: 'green'}]}>
            <Image
              source={{
                uri:
                  item.track.album.images[0]?.url ??
                  DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK,
              }}
              width={40}
              height={40}
            />
            <Text>{item.track.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  inlineCenter: {
    width,

    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
});

export default AddedTracks;

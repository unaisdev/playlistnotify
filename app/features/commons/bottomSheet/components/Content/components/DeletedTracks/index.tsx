import Text from '@app/features/commons/layout/Text';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';
import {PlaylistItem, Track} from '@app/services/types';
import {View, Image, StyleSheet} from 'react-native';

type TracksListProps = {
  tracksDel?: Track[];
};

const DeletedTracks = ({tracksDel}: TracksListProps) => {
  return (
    <View style={{backgroundColor: 'green'}}>
      {tracksDel?.map((item, index) => {
        return (
          <View key={item.id} style={styles.inlineCenter}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inline: {
    top: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  inlineCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
});

export default DeletedTracks;

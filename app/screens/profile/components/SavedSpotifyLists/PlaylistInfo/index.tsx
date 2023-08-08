import {View, Text, Image} from 'react-native';
import Animated from 'react-native-reanimated';

interface Props {
  id: string;
  image_url?: string;
  name: string;
}

const PlaylistInfo = ({id, image_url, name}: Props) => {
  return (
    <Animated.View
      style={{
        display: 'flex',
        width: 96, 
        gap: 6,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginHorizontal: 10,
      }}>
      {image_url ? (
        <Image
          source={{uri: image_url}}
          style={{
            width: 96,
            height: 96,
            aspectRatio: 1 / 1,
          }}
        />
      ) : (
        <Image
          source={{uri: ''}}
          style={{
            width: 96,
            height: 96,
            aspectRatio: 1 / 1,
          }}
        />
      )}

      <Text style={{color: 'white', fontSize: 10}} numberOfLines={2}>{name}</Text>
    </Animated.View>
  );
};

export default PlaylistInfo;

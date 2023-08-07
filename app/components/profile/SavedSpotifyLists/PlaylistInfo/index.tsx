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
        height: 180,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        // backgroundColor: '#D9D9D6',
        padding: 10,
        borderRadius: 10,
        width: 140,
        marginHorizontal: 10,
      }}>
      {image_url ? (
        <Image
          source={{uri: image_url}}
          style={{
            width: 120,
            height: 120,
            aspectRatio: 1 / 1,
          }}
        />
      ) : (
        <Image
          source={{uri: ''}}
          style={{
            width: 120,
            height: 120,
            aspectRatio: 1 / 1,
          }}
        />
      )}

      <Text style={{color: 'white'}} numberOfLines={2}>{name}</Text>
    </Animated.View>
  );
};

export default PlaylistInfo;

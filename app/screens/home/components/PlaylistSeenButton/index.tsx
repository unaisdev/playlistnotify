import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PlaylistSeenButton = () => {
  return (
    <View>
      <MaterialCommunityIcons name={'eye-check'} size={26} color={'black'} />
      <MaterialCommunityIcons
        name={'eye-off-outline'}
        size={26}
        color={'black'}
      />
    </View>
  );
};

export default PlaylistSeenButton;

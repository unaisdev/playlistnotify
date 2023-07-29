import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {RootTabsParamList} from '../../navigation';
import {useNavigation} from '@react-navigation/native';

interface Props {
  image_url?: string;
}

const ProfileImageButton = ({}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  const handlePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{

      }}>
      <Text>PERFIL</Text>
    </TouchableOpacity>
  );
};

export default ProfileImageButton;

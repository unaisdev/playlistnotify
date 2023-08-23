import {Image, Text, TouchableOpacity, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootTabsParamList} from '@app/navigation';

import {useUserContext} from '@app/containers/userContext';
import {useNavigation} from '@react-navigation/native';

interface Props {
  image_url?: string;
}

const ProfileImageButton = ({}: Props) => {
  const {user} = useUserContext();

  const imageUrl =
    user?.images[0].url ??
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=300';

  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  const handlePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{}}>
      <Image
        source={{uri: imageUrl}}
        style={{width: 30, height: 30, borderRadius: 1000}}
      />
    </TouchableOpacity>
  );
};

export default ProfileImageButton;

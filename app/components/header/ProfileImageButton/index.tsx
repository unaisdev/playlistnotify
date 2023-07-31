import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {RootTabsParamList} from '../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../../../containers/userContext';

interface Props {
  image_url?: string;
}

const ProfileImageButton = ({}: Props) => {
  const {user} = useUserContext();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  const handlePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{}}>
      {user?.images[0].url && (
        <Image
          source={{uri: user?.images[0].url}}
          style={{width: 30, height: 30, borderRadius: 1000}}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfileImageButton;

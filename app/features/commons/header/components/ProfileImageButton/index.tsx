import {Image, Text, TouchableOpacity, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootTabsParamList} from '@app/navigation';

import {useUserContext} from '@app/containers/userContext';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';

const useProfileImageButton = () => {
  const {user} = useUserContext();

  const imageUrl = useMemo(() => {
    if (user?.images[0] == null)
      return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=300';

    return user.images[0].url;
  }, [user?.images]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  const handlePress = () => {
    navigation.navigate('Profile');
  };

  return {
    imageUrl,
    handlePress,
  };
};

const ProfileImageButton = () => {
  const {handlePress, imageUrl} = useProfileImageButton();

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

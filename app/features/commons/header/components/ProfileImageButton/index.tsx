import {Image, TouchableOpacity, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootTabsParamList} from '@app/navigation';

import {useUserContext} from '@app/containers/userContext';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';
import {DEFAULT_PROFILE_IMAGE_URL} from '@app/services/constants';

const useProfileImageButton = () => {
  const {user} = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  const imageUrl = useMemo(() => {
    if (user?.images[0] == null) return DEFAULT_PROFILE_IMAGE_URL;

    return user.images[0].url;
  }, [user?.images]);

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

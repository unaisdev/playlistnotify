import {TouchableOpacity} from 'react-native-gesture-handler';

import {RootTabsParamList} from '@app/navigation';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SettingsButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Feather name="settings" size={18} color={'white'} />
    </TouchableOpacity>
  );
};

export default SettingsButton;

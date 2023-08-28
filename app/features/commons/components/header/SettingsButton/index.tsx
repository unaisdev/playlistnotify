import {RootTabsParamList} from '@app/navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

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

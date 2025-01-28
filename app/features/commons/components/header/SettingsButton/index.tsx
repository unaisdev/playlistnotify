import {TouchableOpacity} from 'react-native-gesture-handler';

import {RootTabsParamList} from '@app/navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Monicon} from '@monicon/native';

const SettingsButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Monicon
        name="material-symbols:settings-rounded"
        size={18}
        color={'white'}
      />
    </TouchableOpacity>
  );
};

export default SettingsButton;

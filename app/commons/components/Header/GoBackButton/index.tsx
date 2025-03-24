import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@app/commons/theme/hooks/useTheme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Monicon} from '@monicon/native';

import {RootStackParamList} from '../../../../../navigation';

interface Props {}

const GoBackButton = ({}: Props) => {
  const {isDarkMode} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.goBack();
  };

  const color = isDarkMode ? 'white' : 'black';

  if (!navigation.canGoBack()) return;

  return (
    <TouchableOpacity style={{height: 28}} onPress={handlePress}>
      <Monicon name="material-symbols:arrow-back-ios" size={22} color={color} />
    </TouchableOpacity>
  );
};

export default GoBackButton;

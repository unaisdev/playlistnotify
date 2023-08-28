import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '@app/features/commons/layout/Text';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../../navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';

interface Props {}

const GoBackButton = ({}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.goBack();
  };

  if (!navigation.canGoBack()) return;

  return (
    <TouchableOpacity style={{height: 28}} onPress={handlePress}>
      <MaterialCommunityIcons name="arrow-left" size={22} color={'black'} />
    </TouchableOpacity>
  );
};

export default GoBackButton;

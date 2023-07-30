import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootTabsParamList} from '../../../navigation';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  image_url?: string;
}

const GoBackButton = ({}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();

  const handlePress = () => {
    navigation.goBack();
  };

  if (!navigation.canGoBack()) return;

  return (
    <TouchableOpacity style={{height: 28}} onPress={handlePress}>
      <MaterialCommunityIcons name="arrow-left" size={22} />
    </TouchableOpacity>
  );
};

export default GoBackButton;

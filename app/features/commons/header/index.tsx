import React from 'react';

import {StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
  BottomTabHeaderProps,
} from '@react-navigation/bottom-tabs';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

import {useRoute} from '@react-navigation/native';
import {useUserContext} from '../../../containers/userContext';
import ProfileImageButton from './components/ProfileImageButton';
import Text from '@app/features/commons/components/Text';

interface TabNames {
  [key: string]: string;
}

const TAB_NAME_DEFAULT = 'Default';

export const TabHeader = ({
  layout,
  navigation,
  options,
  route,
}: BottomTabHeaderProps) => {
  const currentTabName = route.name || TAB_NAME_DEFAULT;
  //marginTop safe, hook SafeAreaView
  const {top} = useSafeAreaInsets();
  const {user} = useUserContext();

  // Define the TAB_NAMES object
  const TAB_NAMES: TabNames = {
    Home: `¡Bienvenido, ${user?.display_name || 'Invitado'}!`,
    Profile: 'Tu perfil',
    SearchPlaylist: '¿Buscas alguna lista?',
  };

  const TabHeaderText = () => {
    const currentTabName = route.name || TAB_NAME_DEFAULT;

    if (!user) return;

    return (
      <Text
        style={{
          color: 'white',
          flexGrow: 1,
        }}>
        {TAB_NAMES[currentTabName]}
      </Text>
    );
  };

  return (
    <View style={[styles.container, {marginTop: top}]}>
      <View style={styles.contentContainer}>
        <TabHeaderText />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
          }}>
          <Feather name="settings" size={18} color={'white'} />
          <ProfileImageButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

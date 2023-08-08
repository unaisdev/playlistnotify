import {StyleSheet, Text, View} from 'react-native';
import GoBackButton from './GoBackButton';
import ProfileImageButton from './ProfileImageButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import NotifyMeButton from './NotifyMeButton';
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
  BottomTabHeaderProps,
} from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import React from 'react';
import {useUserContext} from '../../../containers/userContext';

interface TabHeaderProps {
  props: BottomTabHeaderProps;
}

interface TabNames {
  [key: string]: string;
}

const TAB_NAME_DEFAULT = 'Default';

export const TabHeader = ({props}: TabHeaderProps) => {
  const route = useRoute();
  const currentTabName = route.name || TAB_NAME_DEFAULT;

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
      <Animated.Text
        entering={FadeInLeft.duration(600).delay(200)}
        exiting={FadeOutRight.duration(600)}
        style={{
          color: 'white',
          flexGrow: 1,
        }}>
        {TAB_NAMES[currentTabName]}
      </Animated.Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
    height: '100%',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

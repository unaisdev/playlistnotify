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
import {useUserContext} from '../../containers/userContext';
import {useCallback, useEffect} from 'react';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import React from 'react';

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

  const TAB_NAMES: TabNames = {
    Home: `¡Bienvenido, ${user?.display_name}!`,
    Profile: 'Tu perfil',
    SearchPlaylist: '¿Buscas alguna lista?',
  };
  console.log('currentTabName is', route.name || TAB_NAME_DEFAULT);

  const TabHeaderText = useCallback(() => {
    const currentTabName = route.name || TAB_NAME_DEFAULT;
    return (
      <Animated.Text
        entering={FadeInLeft.duration(600).delay(200)}
        exiting={FadeOutRight.duration(600)}
        style={{
          color: 'white',
          flexGrow: 1,
          backgroundColor: 'red',
        }}>
        {TAB_NAMES[currentTabName]}
      </Animated.Text>
    );
  }, [route.name]);

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

interface PlaylistHeaderProps {
  id: string;
}

export const PlaylistHeader = ({id}: PlaylistHeaderProps) => {
  return (
    <View
      style={[styles.container, {paddingHorizontal: 12, paddingVertical: 12}]}>
      <View
        style={{
          height: 28,
        }}>
        <GoBackButton />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <NotifyMeButton id={id} />
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

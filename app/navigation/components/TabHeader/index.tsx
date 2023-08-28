import React from 'react';

import {StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
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
import Text from '@app/features/commons/layout/Text';
import i18n from '@app/features/locales/i18next';
import {useTranslation} from 'react-i18next';
import SettingsButton from '@app/features/commons/components/header/SettingsButton';
import ProfileImageButton from '@app/features/commons/components/header/ProfileImageButton';

interface TabNames {
  [key: string]: string;
}

const TAB_NAME_DEFAULT = 'Default';

const TabHeader = ({route}: BottomTabHeaderProps) => {
  const {user} = useUserContext();
  const {t} = useTranslation();

  const TabHeaderText = () => {
    const currentTabName = route.name || TAB_NAME_DEFAULT;
    const TAB_NAMES: TabNames = {
      Home: `${t('home.title')} ${user?.display_name || 'Invitado'}`,
      Profile: t('profile.title'),
      SearchPlaylist: t('search.title'),
      Settings: t('settings.title'),
    };

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
    // <View style={[styles.container, {marginTop: top}]}>
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TabHeaderText />
        <View style={styles.rightHeader}>
          <SettingsButton />
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
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  rightHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default TabHeader;

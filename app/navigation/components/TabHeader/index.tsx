import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import AppModal from '@app/features/commons/modal';
import Text from '@app/features/commons/layout/Text';
import SettingsButton from '@app/features/commons/components/Header/SettingsButton';
import ProfileImageButton from '@app/features/commons/components/Header/ProfileImageButton';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';

import {useUserContext} from '../../../containers/UserContext';

interface TabNames {
  [key: string]: string;
}

const TAB_NAME_DEFAULT = 'Default';

const TabHeader = ({route}: BottomTabHeaderProps) => {
  const {top} = useSafeAreaInsets();
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
        textType="bold"
        numberOfLines={1}
        style={{
          color: 'white',
          maxWidth: 260,
        }}>
        {TAB_NAMES[currentTabName]}
      </Text>
    );
  };

  return (
    // <View style={[styles.container, {marginTop: top}]}>
    <View style={[styles.container, {marginTop: top}]}>
      <View style={styles.contentContainer}>
        <TabHeaderText />
        <View style={styles.rightHeader}>
          <SettingsButton />
          <ProfileImageButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 
  contentContainer: {
    width: '100%',
    backgroundColor: 'black',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default TabHeader;

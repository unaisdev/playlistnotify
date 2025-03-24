import React, {useState} from 'react';
import {View, Switch, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Monicon from '@monicon/native';

import Layout from '@app/commons/layout/TabLayout';
import {RootStackParamList} from '@app/navigation';
import {useLanguage} from '@app/commons/hooks/useLanguage';
import {useTheme} from '@app/commons/theme/hooks/useTheme';
import AppModal from '@app/commons/modal';

import {BetaBadge} from './components/BetaBadge';
import {SettingsHeader} from './components/SettingsHeader';
import {SettingsItem} from './components/SettingsItem';
import {LogoutButton} from './components/LogoutButton';
import {styles} from './styles';
import {logoutUser} from '@app/services/user';
import Text from '@app/commons/layout/Text';

const SettingsScreen = () => {
  const [betaModalVisible, setBetaModalVisible] = useState(false);
  const {currentLanguage, changeLanguage, languagesAvailable} = useLanguage();
  const {theme, isDarkMode, toggleTheme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();

  const toggleModal = () => setBetaModalVisible(prev => !prev);

  const handleLogout = () => {
    logoutUser();
    setTimeout(() => {
      navigation.replace('Login');
    }, 600);
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.content}>
        <View style={styles.betaContainer}>
          <BetaBadge onPress={toggleModal} />
        </View>

        <SettingsHeader isDarkMode={isDarkMode} />

        <View style={styles.itemWrapper}>
          <View
            style={[
              styles.itemContainer,
              isDarkMode && styles.itemContainerDark,
            ]}>
            <SettingsItem label={t('settings.darkMode')}>
              <Switch value={isDarkMode} onChange={toggleTheme} />
              <Monicon
                name="mdi:theme-light-dark"
                color={isDarkMode ? 'white' : 'black'}
                size={20}
              />
            </SettingsItem>

            <SettingsItem label={t('settings.language')}>
              <View style={styles.languageContainer}>
                {languagesAvailable.map(item => (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => changeLanguage(item.key)}
                    style={[
                      styles.itemLanguage,
                      isDarkMode && styles.itemLanguageDark,
                    ]}>
                    <Text>{item.value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Monicon
                name="material-symbols:translate-rounded"
                color={isDarkMode ? 'white' : 'black'}
                size={20}
              />
            </SettingsItem>
          </View>
        </View>
      </View>

      <LogoutButton onPress={handleLogout} />
      <AppModal modalVisible={betaModalVisible} toggleModal={toggleModal} />
    </Layout>
  );
};

export default SettingsScreen;

import Text from '@app/features/commons/layout/Text';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import i18n from '@app/features/locales/i18next';
import {SelectList} from 'react-native-dropdown-select-list';
import {useState} from 'react';
import {useLanguage} from '@app/features/commons/hooks/useLanguage';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {Switch} from 'react-native-gesture-handler';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTranslation} from 'react-i18next';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ENCRYPTED_STORAGE} from '@app/services/constants';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@app/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const logoutUser = async () => {
  await EncryptedStorage.removeItem(ENCRYPTED_STORAGE.AUTH_TOKEN);
  await EncryptedStorage.removeItem(ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION);
  await EncryptedStorage.removeItem(ENCRYPTED_STORAGE.REFRESH_TOKEN);
};

const SettingsScreen = () => {
  const {currentLanguage, changeLanguage, languagesAvailable} = useLanguage();
  const {theme, isDarkMode, toggleTheme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {t} = useTranslation();

  const styles = styling(isDarkMode);

  const handleLogout = () => {
    logoutUser();
    setTimeout(() => {
      navigation.replace('Login');
    }, 600);
  };

  return (
    <Layout style={styles.container}>
      <View style={{width: '100%'}}>
        <View style={[styles.inlineGap, {padding: 20}]}>
          <MaterialIcons
            name="app-settings-alt"
            color={isDarkMode ? 'white' : 'black'}
            size={20}
          />
          <Text textType="bold" style={{fontSize: 20}}>
            {t('settings.appsettings_title')}
          </Text>
        </View>

        <View style={styles.itemWrapper}>
          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text textType="regular">{t('settings.darkMode')}</Text>

              <View style={styles.inlineGap}>
                <Switch value={isDarkMode} onChange={() => toggleTheme()} />
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  color={isDarkMode ? 'white' : 'black'}
                  size={20}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text textType="regular">{t('settings.language')}</Text>

              <View style={styles.inlineGap}>
                <View style={{flexDirection: 'row', gap: 8}}>
                  {languagesAvailable.map(item => {
                    return (
                      <TouchableOpacity
                        key={item.key}
                        onPress={() => changeLanguage(item.key)}
                        style={styles.itemLanguage}>
                        <Text>{item.value}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <FontAwesome
                  name="language"
                  color={isDarkMode ? 'white' : 'black'}
                  size={20}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.itemLogout}>
        <MaterialCommunityIcons name="logout" color={'black'} size={16} />
        <Text>{t('settings.logout')}</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemLanguage: {
      backgroundColor: isDarkMode ? '#212121' : '#E0E0E0',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    itemWrapper: {
      width: '100%',

      alignItems: 'center',
    },
    itemContainer: {
      width: '90%',
      backgroundColor: isDarkMode ? '#424242' : '#FAFAFA',
      borderRadius: 8,
      padding: 18,
      rowGap: 16,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    spacer: {
      borderTopWidth: 1,
      marginHorizontal: 80,
      color: 'black',
    },
    itemLogout: {
      width: '80%',
      columnGap: 10,

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F44336',
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 10,
    },
    inlineGap: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 10,
    },
  });
};

export default SettingsScreen;

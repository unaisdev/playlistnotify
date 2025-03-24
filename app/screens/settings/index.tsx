import {useTranslation} from 'react-i18next';
import {Switch} from 'react-native-gesture-handler';
import EncryptedStorage from 'react-native-encrypted-storage';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Text from '@app/commons/layout/Text';
import {RootStackParamList} from '@app/navigation';
import {useNavigation} from '@react-navigation/native';
import Layout from '@app/commons/layout/TabLayout';
import {ENCRYPTED_STORAGE} from '@app/services/constants';
import {useLanguage} from '@app/commons/hooks/useLanguage';
import {useTheme} from '@app/commons/theme/hooks/useTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useState} from 'react';
import AppModal from '@app/commons/modal';
import Monicon from '@monicon/native';

const logoutUser = async () => {
  await EncryptedStorage.removeItem(ENCRYPTED_STORAGE.AUTH_TOKEN);
  await EncryptedStorage.removeItem(ENCRYPTED_STORAGE.AUTH_TOKEN_EXPIRATION);
  await EncryptedStorage.removeItem(ENCRYPTED_STORAGE.REFRESH_TOKEN);
};

const SettingsScreen = () => {
  const [betaModalVisible, setBetaModalVisible] = useState(false);

  const {currentLanguage, changeLanguage, languagesAvailable} = useLanguage();
  const {theme, isDarkMode, toggleTheme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {t} = useTranslation();

  const styles = styling(isDarkMode);

  const toggleModal = () => {
    setBetaModalVisible(prev => !prev);
  };

  const handleLogout = () => {
    logoutUser();
    setTimeout(() => {
      navigation.replace('Login');
    }, 600);
  };

  return (
    <Layout style={styles.container}>
      <View style={{width: '100%'}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => setBetaModalVisible(true)}
            style={styles.capsule}>
            <Text style={{fontSize: 12, color: 'green', textAlign: 'center'}}>
              Beta
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.inlineGap, {padding: 20}]}>
          <Monicon
            name="material-symbols:settings"
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
                <Monicon
                  name="mdi:theme-light-dark"
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
                <Monicon
                  name="material-symbols:translate-rounded"
                  color={isDarkMode ? 'white' : 'black'}
                  size={20}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.itemLogout}>
        <Monicon name="material-symbols:logout" color={'black'} size={16} />
        <Text>{t('settings.logout')}</Text>
      </TouchableOpacity>
      <AppModal modalVisible={betaModalVisible} toggleModal={toggleModal} />
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
    capsule: {
      borderWidth: 1,
      borderColor: 'green',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });
};

export default SettingsScreen;

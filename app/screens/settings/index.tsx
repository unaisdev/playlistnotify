import Text from '@app/features/commons/layout/Text';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import i18n from '@app/features/locales/i18next';
import {SelectList} from 'react-native-dropdown-select-list';
import {useState} from 'react';
import {useLanguage} from '@app/features/commons/hooks/useLanguage';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {Switch} from 'react-native-gesture-handler';
import Layout from '@app/features/commons/layout/Layout';
import {useTranslation} from 'react-i18next';

const SettingsScreen = () => {
  const {currentLanguage, changeLanguage, languagesAvailable} = useLanguage();
  const {theme, isDarkMode, toggleTheme} = useTheme();

  const {t} = useTranslation();

  const styles = styling(isDarkMode);

  return (
    <Layout style={{gap: 20}}>
      <View style={styles.item}>
        <Text>{t('settings.darkMode')}</Text>
        <Switch value={isDarkMode} onChange={() => toggleTheme()} />
      </View>
      <View style={styles.item}>
        <Text>{t('settings.language')}</Text>
        <View style={{flexDirection: 'row', gap: 8}}>
          {languagesAvailable.map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => changeLanguage(item.key)}
                style={{
                  backgroundColor: '#D0C4C5',
                  borderRadius: 6,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}>
                <Text>{item.value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Layout>
  );
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      padding: 12,
      borderColor: isDarkMode ? 'white' : 'black',
    },
    spacer: {
      borderTopWidth: 1,
      marginHorizontal: 80,
      color: 'black',
    },
  });
};

export default SettingsScreen;

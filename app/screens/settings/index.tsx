import Text from '@app/features/commons/layout/Text';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import i18n from '@app/features/locales/i18next';
import {SelectList} from 'react-native-dropdown-select-list';
import {useState} from 'react';
import {useLanguage} from '@app/features/commons/hooks/useLanguage';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {Switch} from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const {currentLanguage, changeLanguage, languagesAvailable} = useLanguage();
  const {theme, toggleTheme} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>{i18n.t('settings.darkMode')}</Text>
        <Switch value={theme === 'dark'} onChange={() => toggleTheme()} />
      </View>
      <View style={styles.item}>
        <Text>{i18n.t('settings.language')}</Text>
        <View style={{flexDirection: 'row', gap: 8}}>
          {languagesAvailable.map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => changeLanguage(item.key)}
                style={{backgroundColor: 'red', borderRadius: 10, padding: 6}}>
                <Text>{item.value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingsScreen;

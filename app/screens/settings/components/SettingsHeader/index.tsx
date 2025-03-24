import React from 'react';
import {View} from 'react-native';
import Text from '@app/commons/layout/Text';
import Monicon from '@monicon/native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

interface SettingsHeaderProps {
  isDarkMode: boolean;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({isDarkMode}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Monicon
        name="material-symbols:settings"
        color={isDarkMode ? 'white' : 'black'}
        size={20}
      />
      <Text textType="bold" style={styles.title}>
        {t('settings.appsettings_title')}
      </Text>
    </View>
  );
};

import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from '@app/commons/layout/Text';
import Monicon from '@monicon/native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({onPress}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Monicon name="material-symbols:logout" color="black" size={16} />
      <Text>{t('settings.logout')}</Text>
    </TouchableOpacity>
  );
};

import React from 'react';
import {View} from 'react-native';
import Text from '@app/commons/layout/Text';
import {styles} from './styles';

interface SettingsItemProps {
  label: string;
  children: React.ReactNode;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  label,
  children,
}) => (
  <View style={styles.item}>
    <Text textType="regular">{label}</Text>
    <View style={styles.content}>{children}</View>
  </View>
);

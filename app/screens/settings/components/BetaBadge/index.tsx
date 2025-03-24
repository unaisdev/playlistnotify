import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from '@app/commons/layout/Text';
import {styles} from './styles';

interface BetaBadgeProps {
  onPress: () => void;
}

export const BetaBadge: React.FC<BetaBadgeProps> = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.capsule}>
    <Text style={styles.text}>Beta</Text>
  </TouchableOpacity>
);

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import Text from '@app/commons/layout/Text';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  variant = 'primary',
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#1DB954', // Spotify green
  },
  secondary: {
    backgroundColor: '#282828',
  },
  danger: {
    backgroundColor: '#FF4444',
  },
});

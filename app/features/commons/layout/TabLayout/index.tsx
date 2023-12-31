import {StyleSheet, TextProps, View, ViewProps} from 'react-native';

import {insets} from '../../theme/metrics';
import {useTheme} from '../../theme/hooks/useTheme';

type Props = {
  children?: React.ReactNode;
} & ViewProps;

const Layout: React.FC<Props> = ({children, style}) => {
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  return <View style={[styles.container, insets, style]}>{children}</View>;
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#212121' : 'white',
    },
  });
};

export default Layout;

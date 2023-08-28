import {StyleSheet, TextProps, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {insets} from '../../theme/metrics';
import {useTheme} from '../../theme/hooks/useTheme';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props & TextProps> = ({children, style}) => {
  const {isDarkMode} = useTheme();
  return (
    <View style={[styles.container(isDarkMode), insets, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (isDarkMode: boolean) => ({
    flex: 1,
    backgroundColor: isDarkMode ? 'black' : 'white',
  }),
});

export default Layout;

import {
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  View,
} from 'react-native';

import {useTheme} from '../../theme/hooks/useTheme';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

type Props = {} & StatusBarProps;

const MyStatusBar = ({...props}: Props) => {
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  return (
    <View style={[styles.statusBar]}>
      <SafeAreaView>
        <StatusBar
          translucent
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
      </SafeAreaView>
    </View>
  );
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      height: STATUSBAR_HEIGHT,
      backgroundColor: isDarkMode ? 'black' : '#79B45D',
    },
  });
};
export default MyStatusBar;

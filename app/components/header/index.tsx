import {StyleSheet, View} from 'react-native';
import GoBackButton from './GoBackButton';
import ProfileImageButton from './ProfileImageButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <GoBackButton />
      </View>

      <View>
        <ProfileImageButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default Header;

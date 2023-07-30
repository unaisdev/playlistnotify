import {StyleSheet, View} from 'react-native';
import GoBackButton from './GoBackButton';
import ProfileImageButton from './ProfileImageButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 28,
        }}>
        <GoBackButton />
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}>
        <Feather name="settings" size={18} />
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
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default Header;

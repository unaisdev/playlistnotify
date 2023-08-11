import {StyleSheet, View} from 'react-native';
import GoBackButton from '../GoBackButton';
import NotifyMeButton from '../NotifyMeButton';

interface PlaylistHeaderProps {
  id: string;
}

const PlaylistHeader = ({id}: PlaylistHeaderProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 28,
        }}>
        <GoBackButton />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <NotifyMeButton id={id} />
      </View>
    </View>
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

export default PlaylistHeader;

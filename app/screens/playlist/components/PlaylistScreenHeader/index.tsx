import GoBackButton from '@app/features/commons/components/Header/GoBackButton';
import NotifyMeButton from '@app/features/commons/components/Header/NotifyMeButton';
import {StyleSheet, View} from 'react-native';

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

      <NotifyMeButton id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default PlaylistHeader;

import {TouchableOpacity, StyleSheet, Alert, View} from 'react-native';
import {SwipeableProps} from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Text from '@app/features/commons/layout/Text';

type Props = {
  playlistId: string;
};

const FlatlistLeftActions = ({playlistId}: Props, props: SwipeableProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={'delete-outline'} size={26} color={'black'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    margin: 4,
  },
});

export default FlatlistLeftActions;

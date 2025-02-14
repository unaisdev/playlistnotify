import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';

import {SwipeableProps} from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import Monicon from '@monicon/native';

const SwipeableLeftActions = (props: SwipeableProps) => {
  return (
    <View style={styles.container}>
      <Monicon
        name={'material-symbols:delete-outline'}
        size={26}
        color={'black'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',

    justifyContent: 'center',
    padding: 8,
    margin: 4,
  },
});

export default SwipeableLeftActions;

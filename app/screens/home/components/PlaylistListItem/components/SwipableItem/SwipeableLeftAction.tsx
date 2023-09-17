import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SwipeableProps} from 'react-native-gesture-handler/lib/typescript/components/Swipeable';

const SwipeableLeftActions = (props: SwipeableProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={'delete-outline'} size={26} color={'black'} />
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

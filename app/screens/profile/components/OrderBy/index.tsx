import Text from '@app/features/commons/layout/Text';
import {useState} from 'react';
import {StyleSheet, Touchable, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderBy = () => {
  const [filterOption, setFilterOption] = useState('Created order');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('pressed')}
        style={styles.inline}>
        <FontAwesome name="unsorted" size={18} color={'white'} />
        <Text style={{fontSize: 12}}>{filterOption}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="view-grid-outline"
          size={18}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
});

export default OrderBy;

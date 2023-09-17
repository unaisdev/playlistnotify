import {StyleSheet, Touchable, TouchableOpacity, View} from 'react-native';

import Text from '@app/features/commons/layout/Text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useBottomSheetProfileContext} from '@app/containers/BottomSheetProfileContext';

type Props = {
  handleBottomSheetOpen: () => void;
};

const OrderBy = ({handleBottomSheetOpen}: Props) => {
  const {sortedType} = useBottomSheetProfileContext();

  const handlePress = () => {
    handleBottomSheetOpen();
    console.log('opened');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.inline}>
        <FontAwesome name="unsorted" size={18} color={'white'} />
        <Text style={{fontSize: 12}}>{sortedType}</Text>
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

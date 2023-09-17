import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Text from '@app/features/commons/layout/Text';
import Layout from '@app/features/commons/layout/TabLayout';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  SORTED_TYPE_KEYS,
  useBottomSheetProfileContext,
} from '@app/containers/BottomSheetProfileContext';

const BottomSheetProfileContent = () => {
  const {setSorted} = useBottomSheetProfileContext();

  return (
    <Layout style={{rowGap: 20}}>
      <Text textType="bold">
        Selecciona el orden en el que aparcen las listas:
      </Text>
      <View
        style={{
          paddingLeft: 12,
          rowGap: 12,
        }}>
        {Object.values(SORTED_TYPE_KEYS).map(key => (
          <TouchableOpacity
            key={key}
            style={{
              columnGap: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setSorted(key);
            }}>
            <FontAwesome6 name="caret-right" size={22} color={'black'} />

            <Text>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Layout>
  );
};

export default BottomSheetProfileContent;

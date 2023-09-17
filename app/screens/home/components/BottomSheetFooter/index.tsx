import {Image, StyleSheet, View} from 'react-native';

import Text from '@app/features/commons/layout/Text';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';
import {useBottomSheetContext} from '@app/containers/BottomSheetHomeContext';

const BottomSheetFooter = () => {
  const {playlist} = useBottomSheetContext();

  return (
    <View style={styles.footerContent}>
      <Image
        source={{
          uri: playlist?.images[0].url ?? DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK,
        }}
        width={46}
        height={46}
      />
      <View>
        <Text style={styles.desc}>{playlist?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {},
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(192, 192, 192, 1)',
    padding: 6,
  },
  desc: {
    fontSize: 12,
  },
});

export default BottomSheetFooter;

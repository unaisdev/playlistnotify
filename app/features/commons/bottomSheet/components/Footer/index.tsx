import React from 'react';
import {BottomSheetFooter, BottomSheetFooterProps} from '@gorhom/bottom-sheet';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PlaylistModel} from '@app/services/types';

interface Props {
  bottomSheetFooterProps: BottomSheetFooterProps;
  playlist?: PlaylistModel | null;
}

const CustomFooter: React.FC<Props> = ({
  bottomSheetFooterProps,
  playlist,
}: Props) => {
  return (
    <BottomSheetFooter {...bottomSheetFooterProps}>
      <View style={styles.footerContent}>
        <Image
          source={{uri: playlist?.images[0].url ?? ''}}
          width={36}
          height={36}
        />
        <View>
          <Text style={styles.desc}>{playlist?.name}</Text>
        </View>
      </View>
    </BottomSheetFooter>
  );
};

const styles = StyleSheet.create({
  footer: {},
  footerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(192, 192, 192, 1)',
    padding: 6,
  },
  desc: {
    fontSize: 10,
  },
});

export default CustomFooter;

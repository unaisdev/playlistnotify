import React, {PropsWithChildren} from 'react';
import {BottomSheetFooter, BottomSheetFooterProps} from '@gorhom/bottom-sheet';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PlaylistModel} from '@app/services/types';
import {useBottomSheetContext} from '@app/containers/bottomSheetContext';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';
import Text from '@app/features/commons/layout/Text';

type Props = PropsWithChildren & BottomSheetFooterProps;

const CustomFooter = ({animatedFooterPosition, children}: Props) => {
  const {playlist} = useBottomSheetContext();

  return (
    <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
      {children}
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
    fontSize: 12,
  },
});

export default CustomFooter;

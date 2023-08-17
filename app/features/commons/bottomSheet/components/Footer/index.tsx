import React from 'react';
import {BottomSheetFooter, BottomSheetFooterProps} from '@gorhom/bottom-sheet';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PlaylistModel} from '@app/services/types';

const CustomFooter: React.FC<
  BottomSheetFooterProps & {playlist?: PlaylistModel | null}
> = props => {
  return (
    <BottomSheetFooter {...props}>
      <View style={styles.footerContent}>
        <Image
          source={{uri: props.playlist?.images[0].url ?? ''}}
          width={36}
          height={36}
        />
        <View>
          <Text style={styles.desc}>{props.playlist?.name}</Text>
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

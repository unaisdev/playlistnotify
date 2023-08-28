import React, {useEffect} from 'react';

import {View} from 'react-native';

import BottomSheetUpdatedPlaylist from '@app/features/commons/components/bottomSheet';

import {useBottomSheetContext} from '../../containers/bottomSheetContext';
import PlaylistList from './components/PlaylistList';

const HomeScreen = () => {
  const {ref} = useBottomSheetContext();

  return (
    <View style={{flex: 1}}>
      <PlaylistList />
      <BottomSheetUpdatedPlaylist ref={ref} />
    </View>
  );
};

export default HomeScreen;

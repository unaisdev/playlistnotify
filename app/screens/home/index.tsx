import React, {useEffect} from 'react';

import {View} from 'react-native';

import BottomSheetUpdatedPlaylist from '@app/features/commons/components/BottomSheet';

import {useBottomSheetContext} from '../../containers/bottomSheetContext';
import PlaylistList from './components/PlaylistList';
import Layout from '@app/features/commons/layout/TabLayout';

const HomeScreen = () => {
  const {ref} = useBottomSheetContext();

  return (
    <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
      <PlaylistList />
      <BottomSheetUpdatedPlaylist ref={ref} />
    </Layout>
  );
};

export default HomeScreen;

import Layout from '@app/commons/layout/TabLayout';
import {RootStackParamList, RootTabsParamList} from '@app/navigation';
import {removePlaylistForNotify} from '@app/services/playlist';
import {UserAddedPlaylistsResponse} from '@app/services/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import BottomSheetContent from './components/BottomSheetContent';
import PlaylistList from './components/PlaylistList';
import BottomSheetUpdatedPlaylist from '@app/commons/components/BottomSheetFor';
import {useBottomSheetContext} from '@app/containers/BottomSheetHomeContext';
import {useHome} from './hooks';
import Text from '@app/commons/layout/Text';
import BottomSheetFooter from './components/BottomSheetFooter';
import Animated, {FadeIn} from 'react-native-reanimated';
import Monicon from '@monicon/native';
import {PoweredBySpotify} from '@app/commons/components/PoweredBySpotify';

const PlaylistsForNotifyScreen = () => {
  const {ref} = useBottomSheetContext();
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <Animated.View entering={FadeIn.duration(1500)} style={{flex: 1}}>
      <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
        <PlaylistList />
        <BottomSheetUpdatedPlaylist
          ref={ref}
          snapPoints={snapPoints}
          content={<BottomSheetContent />}
          footer={props => <BottomSheetFooter {...props} />}
        />
      </Layout>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  nodataContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  loadingText: {maxWidth: 300, textAlign: 'center'},
  noDataText: {
    maxWidth: 300,
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 30,
  },
  noDataDesc: {maxWidth: 400, textAlign: 'left', fontWeight: '400'},
});

export default PlaylistsForNotifyScreen;

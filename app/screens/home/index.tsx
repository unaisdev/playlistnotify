import React, {useEffect, useMemo, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Text from '@app/features/commons/layout/Text';
import Layout from '@app/features/commons/layout/TabLayout';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useBottomSheetContext} from '@app/containers/BottomSheetHomeContext';
import BottomSheetUpdatedPlaylist from '@app/features/commons/components/BottomSheetFor';

import PlaylistList from '../playlists-for-notify/components/PlaylistList';
import BottomSheetFooter from '../playlists-for-notify/components/BottomSheetFooter';
import BottomSheetContent from '../playlists-for-notify/components/BottomSheetContent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabsParamList} from '@app/navigation';
import {useProfile} from '../profile/hooks/useProfile';

const UpdatedPlaylistImagesList = () => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const list: {display: boolean; img: string}[] = [
    {
      display: true,
      img: 'https://i.scdn.co/image/ab67706c0000bebbd9535582accae50c518b825a',
    },
    {
      display: false,
      img: 'https://mosaic.scdn.co/640/ab67616d0000b2730d8dfc539a831baeab2f6a15ab67616d0000b27319f892cc0f14a6176594adcfab67616d0000b273a4268639fb789e5b44b4ca53ab67616d0000b273f7cb8aee16f4e2ef3600a187',
    },
    {
      display: false,
      img: 'https://mosaic.scdn.co/640/ab67616d0000b2731c8a849fc29dcd2e7d06cb52ab67616d0000b2731f6efc4f43f2474945d82563ab67616d0000b273a1035396117d3635c361be58ab67616d0000b273f9f1721aac14a6fb8cdacfaa',
    },
    {
      display: true,
      img: 'https://mosaic.scdn.co/640/ab67616d0000b2730deacf472b21a3773d37b3f4ab67616d0000b27397dd973df77a343bd38bcff7ab67616d0000b273add81dfc2ee9f05f616a923fab67616d0000b273c6d155c7dc4f59e7d61f5859',
    },
  ];

  const filteredList = list.filter(item => item.display).slice(-2);

  console.log(displayIndex);

  return (
    <View
      style={{
        flexDirection: 'row',
        bottom: -20,
        position: 'absolute',
      }}>
      {filteredList.map((item, index) => {
        if (displayIndex < 2 && item.display) {
          return (
            <Image
              key={item.img}
              source={{uri: item.img}}
              style={{
                width: 50,
                height: 50,
                transform: [{rotate: '-25deg'}],
              }}
            />
          );
        }
      })}
    </View>
  );
};

const HomeScreen = () => {
  const {userPlaylists} = useProfile();
  const tabNavigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamList>>();
  const screenNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Layout style={{rowGap: 20}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 6,
        }}>
        {userPlaylists.slice(0, 6).map((item, index) => {
          return (
            <View key={item.id} style={{width: '49%'}}>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: '#004D40',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
                onPress={() => {
                  screenNavigation.navigate('Playlist', {id: item.id});
                }}>
                <View
                  style={{
                    flex: 1,
                    columnGap: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Image
                    source={{uri: item.images[0].url}}
                    style={{width: 50, height: 50}}
                  />
                  <Text style={{fontSize: 12, width: '60%'}} numberOfLines={2}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        style={{
          height: 60,
          backgroundColor: '#004D40',
          borderRadius: 12,
          overflow: 'hidden',
        }}
        onPress={() => {
          tabNavigation.navigate('PlaylistsForNotify');
        }}>
        <UpdatedPlaylistImagesList />

        <View
          style={{
            padding: 16,
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Text colorReverted>Listas actualizadas</Text>
        </View>
      </TouchableOpacity>
    </Layout>
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

export default HomeScreen;

import Layout from '@app/features/commons/layout/TabLayout';
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
import BottomSheetUpdatedPlaylist from '@app/features/commons/components/BottomSheetFor';
import {useBottomSheetContext} from '@app/containers/BottomSheetHomeContext';
import {useHome} from './hooks';
import Text from '@app/features/commons/layout/Text';
import BottomSheetFooter from './components/BottomSheetFooter';
import Animated, {FadeIn} from 'react-native-reanimated';
import Monicon from '@monicon/native';
import {PoweredBySpotify} from '@app/features/commons/components/PoweredBySpotify';

type Props = {
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  userNotifiedPlaylists: UserAddedPlaylistsResponse[];
};

const PlaylistsForNotifyScreen = () => {
  const {isLoading, isRefetching, refetch, userNotifiedPlaylists} = useHome();

  const {ref} = useBottomSheetContext();
  const snapPoints = useMemo(() => ['50%'], []);

  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const showAlert = (item: UserAddedPlaylistsResponse) =>
    Alert.alert(
      'Confirmar Acción',
      '¿Estás seguro de que deseas realizar esta acción?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Acción cancelada'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            await removePlaylistForNotify(item.playlistId, item.userId);
            refetch();
            // swipableRef?.current?.close();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );

  useEffect(() => {
    if (userNotifiedPlaylists)
      userNotifiedPlaylists.map(item => console.log(item.playlistId));
  }, [userNotifiedPlaylists]);

  if (isLoading)
    return (
      <View style={[styles.loadingContainer]}>
        <Text style={styles.loadingText}>
          {t('loading_notified_playlists')}
        </Text>
        <ActivityIndicator />
      </View>
    );

  if (!userNotifiedPlaylists) return;

  if (userNotifiedPlaylists?.length === 0)
    return (
      <Layout>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 12,
            marginHorizontal: 20,
            rowGap: 48,
          }}
          style={styles.nodataContainer}>
          <View style={{rowGap: 12}}>
            <Text style={styles.noDataText}>
              ¿Todavía no has seleccionado ninguna lista para que te
              notifiquemos?
            </Text>

            <Text style={styles.noDataDesc}>
              Para poder notificarte sobre la actualización de una lista de
              reproducción, primero deberás de seleccionar alguna.
            </Text>
            <Text>
              Accede desde tu foto de perfil a tus playlists, en la parte
              superior derecha, o utiliza el buscador para encontrar una en
              concreto.
            </Text>
            {/* <View style={styles.inline}>
          <Text>Puedes probar con esta: </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Playlist', {id: defaultPlaylist.id});
            }}>
            <PlaylistInfo
              id={defaultPlaylist.id}
              image_url={defaultPlaylist.image_url}
              name={defaultPlaylist.name}
            />
          </TouchableOpacity>
        </View> */}
            <View style={styles.inline}>
              <Text style={{flex: 1}}>
                Marca el icono de notificación en la cabecera de las listas de
                reproducción.
              </Text>
              <View
                style={[styles.inline, {flex: 1, justifyContent: 'center'}]}>
                <Monicon
                  name="material-symbols:notifications-off-outline-rounded"
                  size={24}
                  color={'gray'}
                />
                <Monicon
                  name="material-symbols:arrow-right-alt"
                  size={24}
                  color={'gray'}
                />
                <Monicon
                  name="material-symbols:notifications-active-rounded"
                  size={24}
                  color={'gray'}
                />
              </View>
            </View>
          </View>
          <PoweredBySpotify />
        </ScrollView>
      </Layout>
    );

  return (
    <Animated.View entering={FadeIn.duration(1500)} style={{flex: 1}}>
      <Layout style={{paddingHorizontal: 0, paddingVertical: 0}}>
        <PlaylistList
          isLoading={isLoading}
          isRefetching={isRefetching}
          refetch={refetch}
          userNotifiedPlaylists={userNotifiedPlaylists}
        />
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

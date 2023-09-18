import React, {useEffect, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Text from '@app/features/commons/layout/Text';
import Layout from '@app/features/commons/layout/TabLayout';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useBottomSheetContext} from '@app/containers/BottomSheetHomeContext';
import BottomSheetUpdatedPlaylist from '@app/features/commons/components/BottomSheetFor';

import {useHome} from './hooks';
import PlaylistList from './components/PlaylistList';
import BottomSheetFooter from './components/BottomSheetFooter';
import BottomSheetContent from './components/BottomSheetContent';

const HomeScreen = () => {
  const {isLoading, isRefetching, refetch, userNotifiedPlaylists} = useHome();
  const {t} = useTranslation();

  const {ref} = useBottomSheetContext();
  const snapPoints = useMemo(() => ['50%'], []);

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
                <MaterialIcon
                  name="notifications-off"
                  size={24}
                  color={'gray'}
                />
                <MaterialIcon name="arrow-right-alt" size={24} color={'gray'} />
                <MaterialIcon
                  name="notifications-active"
                  size={24}
                  color={'black'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    );

  return (
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
        footer={props => <BottomSheetFooter />}
      />
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

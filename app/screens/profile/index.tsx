import React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '@app/features/commons/components/Text';

import SavedSpotifyLists from './components/SavedSpotifyLists';

import {PlaylistModel} from '../../services/types';

import {useUserContext} from '../../containers/userContext';
import {useEffect, useState} from 'react';
import {getUserPlaylists} from '../../services/user';

const ProfileScreen = () => {
  const {user} = useUserContext();

  const [userPlaylists, setUserPlaylists] = useState<PlaylistModel[]>();

  const init = async () => {
    const userPlaylists = await getUserPlaylists();
    setUserPlaylists(userPlaylists);
  };

  useEffect(() => {
    init();
  }, []);

  if (!user) return;

  return (
    <View
      style={[styles.container, {backgroundColor: 'black', height: '100%'}]}>
      <View style={{padding: 12}}>
        <Text
          style={{
            fontSize: 12,
            color: 'white',
          }}>
          Tanto aquí, como en el buscador, podrás elegir las listas de las que
          quieres recibir notificaciones en Spotify.
        </Text>
      </View>

      <SavedSpotifyLists
        text={'Tus listas'}
        playlists={userPlaylists?.filter(item =>
          item.owner.display_name.includes(user.display_name),
        )}
      />

      <SavedSpotifyLists
        text={'Tus listas guardadas'}
        playlists={userPlaylists?.filter(
          item => !item.owner.display_name.includes(user.display_name),
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;

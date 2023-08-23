import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import SavedSpotifyLists from './components/SavedSpotifyLists';

import {PlaylistModel} from '../../services/types';

import {useUserContext} from '../../containers/userContext';
import {useEffect, useState} from 'react';
import {getUserPlaylists} from '../../services/user';

const ProfileScreen = () => {
  const {user} = useUserContext();

  const [userPlaylists, setUserPlaylists] = useState<PlaylistModel[]>();
  const [userFeaturedPlaylists, setUserFeaturedPlaylists] = useState<
    PlaylistModel[]
  >([]);

  const init = async () => {
    const userPlaylists = await getUserPlaylists();
    // const userFeaturedPlaylists = await getUserFeaturedPlaylists();
    setUserPlaylists(userPlaylists);
    // setUserFeaturedPlaylists(userFeaturedPlaylists);
  };

  useEffect(() => {
    init();
  }, []);

  if (!user) return;
  // if (!userPlaylists) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{backgroundColor: 'black', height: '100%'}}>
      <View style={styles.container}>
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

        {/* <View>
        <SavedSpotifyLists
          text={'Últimas listas vistas'}
          userOwnedPlaylists={userFeaturedPlaylists}
        />
      </View> */}

        <View>
          <SavedSpotifyLists
            text={'Tus listas'}
            playlists={userPlaylists?.filter(item =>
              item.owner.display_name.includes(user.display_name),
            )}
          />
        </View>

        <View>
          <SavedSpotifyLists
            text={'Tus listas guardadas'}
            playlists={userPlaylists?.filter(
              item => !item.owner.display_name.includes(user.display_name),
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topinfo: {},
});

export default ProfileScreen;

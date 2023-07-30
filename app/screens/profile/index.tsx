import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getUserFeaturedPlaylists, getUserPlaylists} from '../../services/user';
import {useEffect, useState} from 'react';
import {PlaylistModel} from '../../services/types';
import SavedSpotifyLists from '../../components/profile/SavedSpotifyLists';
import {useUserContext} from '../../context/userContext';

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
  if (!userPlaylists) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingVertical: 12}}
      style={styles.container}>
      <View style={{padding: 8}}>
        <Text>Este es tu perfil,</Text>
        <Text>
          ¡Aquí podrás seleccionar las listas que tienes guardadas en Spotify!
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
          userOwnedPlaylists={userPlaylists.filter(item =>
            item.owner.display_name.includes(user.display_name),
          )}
        />
      </View>

      <View>
        <SavedSpotifyLists
          text={'Tus listas guardadas'}
          userOwnedPlaylists={userPlaylists.filter(
            item => !item.owner.display_name.includes(user.display_name),
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topinfo: {},
});

export default ProfileScreen;

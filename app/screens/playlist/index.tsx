import {RouteProp, useNavigation} from '@react-navigation/native';
import {View, Text, Pressable, Image} from 'react-native';
import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Linking} from 'react-native';
import {RootStackParamList} from '../../navigation';
import {PlaylistModel} from '../../services/types';
import LinearGradient from 'react-native-linear-gradient';
import {getPlaylist} from '../../services/playlist';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  route: RouteProp<RootStackParamList, 'Playlist'>;
}

const PlaylistScreen = ({route}: Props) => {
  const {id} = route.params;

  const [playlistData, setPlaylistData] = useState<PlaylistModel | undefined>();

  const init = async () => {
    const playlist = await getPlaylist(id);
    if (!playlist) return;
    setPlaylistData(playlist);
  };

  useEffect(() => {
    init();
  }, []);

  if (!playlistData) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        locations={[1, 0.3, 0.9, 0]}
        colors={[
          'rgba(255, 255, 255, 1)',
          'rgba(229, 231, 235, 1)',
          'rgba(245, 211, 215, 0.5)',
          'rgba(255, 255, 255, 0)',
        ]}
        style={{
          paddingHorizontal: 12,
        }}>
        {playlistData.images[0]?.url ? (
          <Pressable
            onPress={() => {
              Linking.openURL(playlistData.uri);
            }}
            style={{
              width: 96,
              height: 96,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}>
            <Image
              source={{uri: playlistData.images[0]?.url}}
              style={{
                width: 120,
                height: 120,
              }}
            />
          </Pressable>
        ) : (
          <></>
        )}
        <View
          style={{
            width: '75%',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingVertical: 8,
              paddingRight: 16,
            }}>
            <Pressable
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: 250,
              }}
              onPress={() => {
                Linking.openURL(playlistData.owner.uri);
              }}>
              <Feather name="user" size={8} />
              <Text style={{paddingLeft: 4, fontSize: 10}} numberOfLines={1}>
                {playlistData.owner.display_name}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              paddingLeft: 12,
              flexGrow: 1,
              paddingVertical: 6,
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <Pressable
              onPress={() => {
                Linking.openURL(playlistData.uri);
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  marginBottom: 4,
                  maxWidth: 180,
                  overflow: 'hidden',
                }}
                numberOfLines={3}>
                {playlistData.name}
              </Text>
            </Pressable>

            {/* <Text className="text-[10px] whitespace-nowrap">
              {playlistData.description}
            </Text> */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 10, marginBottom: 4}}>
                canciones en esta lista
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                  }}>
                  {playlistData?.followers.total}
                </Text>
                <Feather name="users" size={8} />
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PlaylistScreen;
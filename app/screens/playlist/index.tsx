import {useMemo} from 'react';

import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  View,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {SafeAreaView} from 'react-native-safe-area-context';
import TrackList from './components/TrackList';

import {RootStackParamList} from '../../navigation';
import {PlaylistItem} from '../../services/types';

import {usePlaylistAllTracks} from '../../features/commons/hooks/usePlaylistAllTracks';
import {usePlaylist} from '../../features/commons/hooks/usePlaylist';
import PlaylistHeader from '@app/screens/playlist/components/PlaylistScreenHeader';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import Text from '@app/features/commons/layout/Text';
import {useTranslation} from 'react-i18next';

interface Props {
  route: RouteProp<RootStackParamList, 'Playlist'>;
}

const PlaylistScreen = ({route}: Props) => {
  const {id} = route.params;
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();

  const playlistReq = usePlaylist({playlistId: id});

  const {
    tracks,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    error,
    refetch,
  } = usePlaylistAllTracks(id);

  const playlistData = useMemo(() => {
    return playlistReq.data;
  }, [playlistReq]);

  const playlistTracksData = useMemo<PlaylistItem[]>(() => {
    return tracks;
  }, [tracks]);

  const lightModeColors = [
    'rgba(255, 255, 255, 1)',
    'rgba(229, 231, 235, 1)',
    'rgba(245, 211, 215, 0.5)',
    'rgba(255, 255, 255, 0)',
  ];

  const darkModeColors = [
    'rgba(0, 0, 0, 1)',
    'rgba(31, 41, 55, 1)',
    'rgba(59, 130, 246, 0.5)',
    'rgba(0, 0, 0, 0)',
  ];

  const gradientColors = isDarkMode ? darkModeColors : lightModeColors;

  if (!playlistData) return;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 0, paddingHorizontal: 0, paddingVertical: 0}}>
        <PlaylistHeader id={id} />
        <View style={styles.playlistInfo}>
          <Pressable
            onPress={() => Linking.openURL(playlistData?.uri)}
            style={styles.imageShadow}>
            <Image
              source={{uri: playlistData.images[0]?.url}}
              width={88}
              height={88}
            />
          </Pressable>
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'space-evenly',
            }}>
            <View style={styles.topContent}>
              <TouchableOpacity onPress={() => ({})} style={styles.open}>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={require('../../assets/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png')}
                />
                <Text style={styles.openText}>Abrir en Spotify</Text>
              </TouchableOpacity>
              <Pressable
                style={styles.inline}
                onPress={() => {
                  Linking.openURL(playlistData.owner.uri);
                }}>
                <Feather
                  name="user"
                  size={8}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={{fontSize: 10}} numberOfLines={1}>
                  {playlistData.owner.display_name}
                </Text>
              </Pressable>
            </View>
            <View style={styles.bottomContent}>
              <Pressable
                onPress={() => {
                  Linking.openURL(playlistData.uri);
                }}>
                <Text style={styles.playlistName} numberOfLines={3}>
                  {playlistData.name}
                </Text>
              </Pressable>

              <View style={styles.columnBetween}>
                <View style={styles.inline}>
                  <Text
                    style={{
                      fontSize: 10,
                    }}>
                    {playlistData?.followers.total}
                  </Text>
                  <Feather
                    name="users"
                    size={8}
                    color={isDarkMode ? 'white' : 'black'}
                  />
                </View>
                <Text style={{fontSize: 10}}>
                  {playlistData.tracks.total}{' '}
                  {t('playlist.number_tracks_playlist')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Layout>

      <TrackList
        tracks={playlistTracksData}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isLoading={isLoading}
        error={error}
      />
      {isLoading && (
        <ActivityIndicator
          style={{margin: 12}}
          size={'small'}
          color={'black'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

  imageShadow: {
    width: 96,
    height: 96,
    elevation: 14,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .9)',
        shadowOffset: {height: 3, width: 5},
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 20,
        zIndex: 20,
      },
    }),
  },
  image: {
    width: 88,
    height: 88,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  inline: {
    columnGap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContent: {
    paddingLeft: 12,
    flexGrow: 1,
    paddingVertical: 6,

    justifyContent: 'flex-end',
  },
  playlistName: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    maxWidth: 180,
    overflow: 'hidden',
  },
  columnBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  open: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  openText: {
    fontSize: 12,
    color: '#1db954',
  },
});

export default PlaylistScreen;

import {useMemo} from 'react';

import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  View,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import {SafeAreaView} from 'react-native-safe-area-context';
import TrackList from './components/TrackList';

import {RootStackParamList} from '../../navigation';
import {PlaylistItem} from '../../services/types';

import {usePlaylistAllTracks} from '../../features/commons/hooks/usePlaylistAllTracks';
import {usePlaylist} from '../../features/commons/hooks/usePlaylist';
import {useQuery} from '@tanstack/react-query';
import PlaylistHeader from '@app/screens/playlist/components/PlaylistScreenHeader';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import Text from '@app/features/commons/layout/Text';

interface Props {
  route: RouteProp<RootStackParamList, 'Playlist'>;
}

const PlaylistScreen = ({route}: Props) => {
  const {id} = route.params;
  const {isDarkMode} = useTheme();

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
    <Layout style={{flex: 1}}>
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
              <Pressable
                style={styles.inline}
                onPress={() => {
                  Linking.openURL(playlistData.owner.uri);
                }}>
                <Feather name="user" size={8} color={'black'} />
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
                <Text style={{fontSize: 10}}>
                  {playlistData.tracks.total} canciones en esta lista
                </Text>
                <View style={styles.inline}>
                  <Text
                    style={{
                      fontSize: 10,
                    }}>
                    {playlistData?.followers.total}
                  </Text>
                  <Feather name="users" size={8} color={'black'} />
                </View>
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
    </Layout>
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
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  imageShadow: {
    width: 96,
    height: 96,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  image: {
    width: 88,
    height: 88,
  },
  topContent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingRight: 16,
  },
  inline: {
    gap: 4,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
  },
});

export default PlaylistScreen;

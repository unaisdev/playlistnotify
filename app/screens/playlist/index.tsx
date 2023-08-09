import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Linking} from 'react-native';
import {RootStackParamList, RootTabsParamList} from '../../navigation';
import {PlaylistModel} from '../../services/types';
import LinearGradient from 'react-native-linear-gradient';
import {getPlaylist, getPlaylistTracks} from '../../services/playlist';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import GoBackButton from '../../features/commons/header/GoBackButton';
import NotifyMeButton from '../../features/commons/header/NotifyMeButton';
import TrackList from './components/TrackList';
import {useTrackList} from './components/TrackList/hooks/useTrackList';
import {usePlaylist} from './components/TrackList/hooks/usePlaylist';

interface Props {
  route: RouteProp<RootStackParamList, 'Playlist'>;
}

interface PlaylistHeaderProps {
  id: string;
}

const PlaylistHeader = ({id}: PlaylistHeaderProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 28,
        }}>
        <GoBackButton />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <NotifyMeButton id={id} />
      </View>
    </View>
  );
};

const PlaylistScreen = ({route}: Props) => {
  const {id} = route.params;

  const playlistReq = usePlaylist({playlistId: id});

  const {
    tracks,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useTrackList(id);

  const playlistData = useMemo(() => {
    return playlistReq.data;
  }, [playlistReq]);

  if (!playlistData) return;

  return (
    <SafeAreaView style={{height: '100%'}}>
      <View>
        <PlaylistHeader id={id} />
      </View>
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
        style={styles.linearGradient}>
        <Pressable
          onPress={() => Linking.openURL(playlistData?.uri)}
          style={styles.imageShadow}>
          <Image
            source={{uri: playlistData.images[0]?.url}}
            style={styles.image}
          />
        </Pressable>
        <View
          style={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-evenly',
          }}>
          <View style={styles.topContent}>
            <Pressable
              style={styles.inline}
              onPress={() => {
                Linking.openURL(playlistData.owner.uri);
              }}>
              <Feather name="user" size={8} />
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
                <Feather name="users" size={8} />
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      <TrackList
        tracks={tracks}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isLoading={isLoading}
        error={error}
      />
      {isFetching && (
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
    display: 'flex',
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
  linearGradient: {
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    display: 'flex',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingRight: 16,
  },
  inline: {
    display: 'flex',
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContent: {
    paddingLeft: 12,
    flexGrow: 1,
    paddingVertical: 6,
    display: 'flex',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
  },
});

export default PlaylistScreen;

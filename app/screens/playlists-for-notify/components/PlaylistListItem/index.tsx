import React, {useEffect, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

import Text from '@app/features/commons/layout/Text';
import Octicons from 'react-native-vector-icons/Octicons';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK} from '@app/services/constants';

import SkeletonItem from './components/SkeletonItem';
import {usePlaylist} from '../../../../features/commons/hooks/usePlaylist';
import {useBottomSheetContext} from '../../../../containers/BottomSheetHomeContext';
import {usePlaylistAllTracks} from '../../../../features/commons/hooks/usePlaylistAllTracks';

interface Props {
  playlistId: string;
  savedPlaylistTracksIds: string[];
  index: number;
  isRefetching: boolean;
}

const PlaylistListItem = ({
  playlistId,
  savedPlaylistTracksIds,
  index,
  isRefetching,
}: Props) => {
  const {tracks, hasNextPage, refetch} = usePlaylistAllTracks(playlistId);
  const {data: playlist, isLoading} = usePlaylist({playlistId: playlistId});
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();
  const {handlePresentModalPress, compareAllData} = useBottomSheetContext();

  useEffect(() => {
    refetch();
  }, [isRefetching]);

  const onPress = () => {
    if (playlist && tracksUpdate) {
      compareAllData(playlist, tracksUpdate);
    } else return;

    setTimeout(() => {
      if (
        tracksUpdate?.resultDeleted.length === 0 &&
        tracksUpdate.resultNew.length === 0
      )
        return;

      handlePresentModalPress();
    }, 400);
  };

  const tracksUpdate = useMemo(() => {
    if (!hasNextPage) {
      const resultNew = tracks.filter(item1 => {
        return !savedPlaylistTracksIds.some(item2 => {
          return item1.track.id === item2;
        });
      });

      const resultDeleted = savedPlaylistTracksIds.filter(item1 => {
        return !tracks.some(item2 => {
          return item1 === item2.track.id;
        });
      });

      return {
        resultNew,
        resultDeleted,
      };
    }
  }, [tracks]);

  const hasAddedOrDeleted = useMemo(() => {
    const hasnotAddedTracks = tracksUpdate?.resultNew.length === 0;
    const hasnotDeletedTracks = tracksUpdate?.resultDeleted.length === 0;

    if (hasnotAddedTracks && hasnotDeletedTracks) {
      return {opacity: 0.4};
    }

    return {opacity: 1};
  }, [tracksUpdate]);

  if (!playlist) return <SkeletonItem />;

  if (!tracksUpdate) return <SkeletonItem />;

  return (
    <Animated.View
      key={playlist.id}
      entering={FadeInLeft.duration(500).delay(index * 200)}
      exiting={FadeOutRight.duration(500)}
      layout={Layout.duration(1000)}>
      <TouchableOpacity onPress={onPress} style={hasAddedOrDeleted}>
        <View style={styles.container}>
          <Image
            source={{
              uri: playlist.images[0].url ?? DEFAULT_NO_IMAGE_PLAYLIST_OR_TRACK,
            }}
            width={86}
            height={86}
          />

          <View style={styles.infoContainer}>
            <View style={styles.inlineBetween}>
              <Text style={styles.title} numberOfLines={2}>
                {playlist.name}
              </Text>
            </View>
            {tracksUpdate.resultNew.length === 0 &&
            tracksUpdate.resultDeleted.length === 0 ? (
              <View style={styles.inline}>
                <Text>{t('no_tracks_new_or_deleted')}</Text>
              </View>
            ) : (
              <View style={styles.inlineBetween}>
                <View style={styles.inline}>
                  <Octicons
                    name="diff-added"
                    size={12}
                    color={isDarkMode ? 'white' : 'black'}
                  />
                  <Text style={{fontSize: 12}}>
                    {tracksUpdate.resultNew.length}{' '}
                    {t('tracks_added').toLowerCase()}
                  </Text>
                </View>
                <View style={styles.inline}>
                  <Octicons
                    name="diff-removed"
                    size={12}
                    color={isDarkMode ? 'white' : 'black'}
                  />
                  <Text style={{fontSize: 12}}>
                    {tracksUpdate.resultDeleted.length}{' '}
                    {t('tracks_deleted').toLowerCase()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
    height: 86,
    // backgroundColor: 'red',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    maxWidth: 240,
    // backgroundColor: 'red',
  },
  lastAct: {
    opacity: 0.4,
    fontSize: 10,
  },
  inlineBetween: {
    flexGrow: 1,
    // backgroundColor: 'purple',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inline: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  infoContainer: {
    padding: 8,
    flexGrow: 1,
    // backgroundColor: 'gray',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default React.memo(PlaylistListItem);

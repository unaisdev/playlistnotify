import React from 'react';

import {FlatList, StyleSheet, Text, View} from 'react-native';
import TrackItem from '../TrackItem';

import {PlaylistItem, PlaylistModel} from '../../../../services/types';
import i18n from '@app/features/locales/i18next';
import {useTranslation} from 'react-i18next';

interface Props {
  tracks: PlaylistItem[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  error: unknown;
}

const TrackList = ({
  tracks,
  fetchNextPage,
  hasNextPage,
  isLoading,
  error,
}: Props) => {
  const {t} = useTranslation();

  const handleEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>{t('simple_loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error occurred while fetching data.</Text>
      </View>
    );
  }

  return (
    <FlatList
      scrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      data={tracks}
      renderItem={({item, index}) => {
        //only getting tracks from Spotify API response
        //TODO: get all type of items: tracks / episodes https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks info at bottom page
        if (item.track) return <TrackItem item={item} key={item.track.id} />;
        else return <></>;
      }}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5} // Adjust as needed
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
  },
  center: {
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(TrackList);

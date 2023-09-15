import Text from '@app/features/commons/layout/Text';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterItem from './FilterItem';
import {useEffect, useState} from 'react';
import {
  SELECT_FILTERS,
  useProfileFiltersStore,
} from '@app/features/stores/ProfileStore';

type Props = {
  filterAll: () => void;
  filterOwnPlaylists: () => void;
  filterSpotifyPlaylists: () => void;
  filterByTracksNum: (maxTracks: number) => void;
};

const FilterLists = ({
  filterAll,
  filterOwnPlaylists,
  filterSpotifyPlaylists,
  filterByTracksNum,
}: Props) => {
  const {isDarkMode} = useTheme();
  const {selectedFilter, setSelectedFilter} = useProfileFiltersStore();

  useEffect(() => {
    if (selectedFilter === SELECT_FILTERS.ALL) filterAll();
  }, [selectedFilter]);

  const handleTapFilterOwn = () => {
    setSelectedFilter('OwnFilter');
    filterOwnPlaylists();
  };

  const handleTapFilterSpotify = () => {
    setSelectedFilter('SpotifyFilter');
    filterSpotifyPlaylists();
  };

  const handleTapFilterMax = () => {
    setSelectedFilter('MaxTracksFilter');
    filterByTracksNum(200);
  };

  return (
    <View style={styles.container}>
      {/* <MaterialCommunityIcons
        name="filter"
        size={16}
        color={'white'}
        style={{padding: 16}}
      /> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerScroll}>
        <FilterItem
          filterFn={handleTapFilterOwn}
          filterText="Propias"
          isSelected={selectedFilter === 'OwnFilter'}
        />
        <FilterItem
          filterFn={handleTapFilterSpotify}
          filterText="Spotify"
          isSelected={selectedFilter === 'SpotifyFilter'}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScroll: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
});

export default FilterLists;

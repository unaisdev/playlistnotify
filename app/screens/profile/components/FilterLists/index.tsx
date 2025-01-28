import {ScrollView, StyleSheet, View} from 'react-native';

import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {
  SELECT_FILTERS,
  useProfileFiltersStore,
} from '@app/features/stores/ProfileStore';

import FilterItem from './FilterItem';
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

  const setFilterAll = () => {
    setSelectedFilter(SELECT_FILTERS.ALL);
    filterAll();
  };

  const handleTapFilterOwn = () => {
    if (selectedFilter !== SELECT_FILTERS.OWN) {
      setSelectedFilter(SELECT_FILTERS.OWN);
      filterOwnPlaylists();
      return;
    }

    setFilterAll();
  };

  const handleTapFilterSpotify = () => {
    if (selectedFilter !== SELECT_FILTERS.SPOTIFY) {
      setSelectedFilter(SELECT_FILTERS.SPOTIFY);
      filterSpotifyPlaylists();
      return;
    }

    setFilterAll();
  };

  const handleTapFilterMax = () => {
    setSelectedFilter(SELECT_FILTERS.MAX_TRACKS_200);
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
          filterText="Tus listas"
          isSelected={selectedFilter === 'OwnFilter'}
        />
        <FilterItem
          filterFn={handleTapFilterSpotify}
          filterText="De Spotify"
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

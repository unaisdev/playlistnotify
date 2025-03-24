import {PlaylistModel} from '@app/services/types';
import {create} from 'zustand';

export const SELECT_FILTERS = {
  ALL: 'All',
  OWN: 'OwnFilter',
  SPOTIFY: 'SpotifyFilter',
  MAX_TRACKS_200: 'MaxTracksFilter',
};

export type SELECT_FILTERS_TYPE =
  (typeof SELECT_FILTERS)[keyof typeof SELECT_FILTERS];

type ProfileStoreType = {
  selectedFilter: SELECT_FILTERS_TYPE;
  setSelectedFilter: (filter: SELECT_FILTERS_TYPE) => void;
};

export const useProfileFiltersStore = create<ProfileStoreType>((set, get) => {
  return {
    selectedFilter: 'All',
    setSelectedFilter: (selected: SELECT_FILTERS_TYPE) => {
      set(state => {
        if (state.selectedFilter === selected) {
          return {
            selectedFilter: SELECT_FILTERS.ALL,
          };
        }

        return {
          selectedFilter: selected,
        };
      });
    },
  };
});

import {useBottomSheetContext} from '@app/containers/bottomSheetContext';
import {useTracksInfo} from '@app/features/commons/hooks/useTracksInfo';
import {Track} from '@app/services/types';
import React from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';

export function useBSContent() {
  const {tracksCompared} = useBottomSheetContext();
  const scrollRef = React.useRef<SwiperFlatList>(null);

  const goToFirstIndex = () => {
    scrollRef.current?.goToFirstIndex();
  };
  const goToSecondIndex = () => {
    scrollRef.current?.scrollToIndex({index: 1});
  };

  const tracksNew = tracksCompared.resultNew;
  const tracksDeleted = useTracksInfo(tracksCompared.resultDeleted);

  const filteredTracksDeleted = tracksDeleted.filter(
    track => track !== undefined,
  ) as Track[];

  return {
    tracksNew,
    tracksDel: filteredTracksDeleted,
    scrollRef,
    goToFirstIndex,
    goToSecondIndex,
  };
}

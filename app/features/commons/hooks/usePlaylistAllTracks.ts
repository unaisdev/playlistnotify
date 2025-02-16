import {useInfiniteQuery} from '@tanstack/react-query';
import {getPlaylistTracks} from '../../../services/playlist';

import React, {useEffect} from 'react';
import {QUERY_KEYS} from '@app/lib/queryKeys';

export const usePlaylistAllTracks = (playlistId: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.playlistTracks(playlistId),
    queryFn: ({pageParam = ''}) => getPlaylistTracks(playlistId, pageParam),
    getNextPageParam: lastPage => lastPage?.next || undefined,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 30 * 60 * 1000, // 30 minutos
  });

  // Memoizar el flatMap para evitar recálculos innecesarios
  const tracks = React.useMemo(
    () => data?.pages.flatMap(page => page?.items ?? []) ?? [],
    [data?.pages],
  );

  // Cargar siguiente página solo si hay más y no estamos ya cargando
  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  return {
    tracks,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
    error,
    refetch,
  };
};

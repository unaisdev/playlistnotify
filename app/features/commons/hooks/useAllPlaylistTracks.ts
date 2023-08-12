import {useInfiniteQuery} from '@tanstack/react-query';
import {getPlaylistTracks} from '../../../services/playlist';

export const useAllPlaylistTracks = (playlistId: string) => {
  const fetchTracks = async ({pageParam = ''}) => {
    const res = await getPlaylistTracks(playlistId, pageParam);
    return res;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['playlistAllTracks', playlistId],
    queryFn: fetchTracks,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.next;
    },
    keepPreviousData: true,
  });

  if (hasNextPage) fetchNextPage();

  //flatMapping data for getting only tracks items
  const tracks = data?.pages.flatMap(page => page?.items ?? []) ?? [];

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

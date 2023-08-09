import {useInfiniteQuery} from '@tanstack/react-query';
import {getPlaylistTracks} from '../../../../../services/playlist';

interface Props {
  playlistId: string;
}

//handle infinite scroll on tracklist
export const useTrackList = ({playlistId}: Props) => {
  //receiving pageParam through the getgetNextPageParam property
  const fetchPlaylists = async ({pageParam = ''}) => {
    const res = await getPlaylistTracks(playlistId, pageParam);
    return res;
  };

  const allTracks = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
        error,
        refetch,
      } = useInfiniteQuery({
        queryKey: ['playlistTracks', playlistId],
        queryFn: fetchPlaylists,
        getNextPageParam: (lastPage, allPages) => {
          return lastPage?.next;
        },
        keepPreviousData: true,
        
      });
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
    queryKey: ['playlistTracks', playlistId],
    queryFn: fetchPlaylists,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.next;
    },
    keepPreviousData: true,
  });

  const tracks = data?.pages.flatMap(page => page?.items ?? []) ?? [];

  return {
    //flatMapping data for getting only tracks items
    tracks,
    allTracks,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
    error,
    refetch,
  };
};

import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {usePlaylist} from '../../../../../screens/playlist/components/TrackList/hooks/usePlaylist';
import {useTrackList} from '../../../../../screens/playlist/components/TrackList/hooks/useTrackList';
import {getPlaylistTracks} from '../../../../../services/playlist';
import {useState} from 'react';

export const useAllPlaylistTracks = (id: string) => {
  const fetchTracks = async ({pageParam = ''}) => {
    const res = await getPlaylistTracks(id, pageParam);
    return res;
  };

  const allTracksReq = useInfiniteQuery({
    queryKey: ['playlistAllTracks', id],
    queryFn: fetchTracks,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.next;
    },
    keepPreviousData: true,
  });

  if (allTracksReq.hasNextPage) allTracksReq.fetchNextPage();

  const tracks =
    allTracksReq.data?.pages.flatMap(page => page?.items ?? []) ?? [];

  const hasNextPage = allTracksReq.hasNextPage;

  return {
    tracks,
    hasNextPage,
  };
};

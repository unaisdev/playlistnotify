import {useQuery} from '@tanstack/react-query';
import {getPlaylist} from '../../../services/playlist';
import {QUERY_KEYS} from '@app/lib/queryKeys';

interface Props {
  playlistId: string;
}

export const usePlaylist = ({playlistId}: Props) => {
  const playlistReq = useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_DETAIL, playlistId],
    queryFn: () => getPlaylist(playlistId),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 30 * 60 * 1000, // 30 minutos
  });

  return playlistReq;
};

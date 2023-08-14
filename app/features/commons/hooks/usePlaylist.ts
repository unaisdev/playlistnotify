import {useQuery} from '@tanstack/react-query';
import {getPlaylist} from '../../../services/playlist';

interface Props {
  playlistId: string;
}

export const usePlaylist = ({playlistId}: Props) => {
  const playlistReq = useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => getPlaylist(playlistId),
  });

  return playlistReq;
};

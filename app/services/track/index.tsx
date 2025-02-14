import {SPOTIFY_API_URL} from '../constants';
import HttpClient from '../httpClient';
import {Track} from '../types';

export const getTrackInfo = async (trackId: string): Promise<Track> => {
  const {data} = await HttpClient<Track>({
    baseURL: SPOTIFY_API_URL,
    url: `/tracks/${trackId}`,
    method: 'get',
  });

  return data;
};

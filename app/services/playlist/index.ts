import {SPOTIFY_API_URL} from '../constants';
import HttpClient from '../httpClient';
import {
  PlaylistItem,
  PlaylistModel,
  PlaylistResponse,
  Track,
  User,
} from '../types';

export const getPlaylist = async (playlistId: string) => {
  console.log(`## Getting playlist data: ${playlistId} ##`);

  try {
    const {data} = await HttpClient({
      baseURL: SPOTIFY_API_URL,
      url: `/playlists/${playlistId}`,
      method: 'get',
    });

    return data as PlaylistModel;
  } catch (error) {
    console.log('getPlaylist', error);
  }
};

export const getPlaylistTracks = async (
  id: string,
  next?: string,
): Promise<PlaylistResponse> => {
  console.log('## Getting playlists tracks ##');

  if (next) {
    const {data} = await HttpClient<PlaylistResponse>(next);
    return data;
  }

  try {
    const {data} = await HttpClient<PlaylistResponse>({
      baseURL: SPOTIFY_API_URL,
      url: `/playlists/${id}/tracks`, // Utiliza el valor de 'next' si está presente, de lo contrario, usa '/me/playlists'
      method: 'get',
    });

    return data;
  } catch (error) {
    console.log('getPlaylistTracks', error);
    throw new Error(error);
  }
};

export const recursiveGetPlaylistTracks = async (
  id: string,
  next?: string,
  accumulatedTracks: PlaylistItem[] = [],
): Promise<PlaylistItem[]> => {
  try {
    const {data} = await HttpClient<PlaylistResponse>({
      baseURL: SPOTIFY_API_URL,
      url: `/playlists/${id}/tracks`, // Utiliza el valor de 'next' si está presente, de lo contrario, usa '/me/playlists'
      method: 'get',
    });

    const allTracks = accumulatedTracks.concat(data.items || []);

    if (data.next) {
      return await recursiveGetPlaylistTracks(id, data.next, allTracks);
    }
    console.log('## Getting user all TRACKS data ##');

    return allTracks;
  } catch (error) {
    console.log('getPlaylistTracks', error);
    throw new Error(error);
  }
};

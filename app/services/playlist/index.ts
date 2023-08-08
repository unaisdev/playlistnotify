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
): Promise<PlaylistResponse> => {
  console.log('## Getting playlists tracks ##');

  try {
    const {data} = await HttpClient<PlaylistResponse>({
      baseURL: SPOTIFY_API_URL,
      url: `/playlists/${id}/tracks`, // Utiliza el valor de 'next' si está presente, de lo contrario, usa '/me/playlists'
      method: 'get',
    });

    return data;
  } catch (error) {
    console.log('getUserPlaylists', error);
    return {};
  }
};

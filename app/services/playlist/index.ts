import HttpClient from '../httpClient';
import {User} from '../types';

const BASE_URL = 'https://api.spotify.com/v1';

export const getPlaylist = async (playlistId: string) => {
  console.log(`## Getting playlist data: ${playlistId} ##`);

  try {
    const {data} = await HttpClient({
      baseURL: BASE_URL,
      url: `/playlists/${playlistId}`,
      method: 'get',
    });

    return data as User;
  } catch (error) {
    console.log('getPlaylist', error);
  }
};


export const getPlaylistTracks = async () => {
    console.log('## Getting user playlists data ##');

    try {
      const {data} = await HttpClient({
        baseURL: BASE_URL,
        url: '/me/playlists',
        method: 'get',
      });
  
      return data as User;
    } catch (error) {
      console.log('getPlaylistTracks', error);
    }
}
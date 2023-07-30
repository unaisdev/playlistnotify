import HttpClient from '../httpClient';
import {PlaylistModel, User} from '../types';

const BASE_URL = 'https://api.spotify.com/v1';

export const getPlaylist = async (playlistId: string) => {
  console.log(`## Getting playlist data: ${playlistId} ##`);

  try {
    const {data} = await HttpClient({
      baseURL: BASE_URL,
      url: `/playlists/${playlistId}`,
      method: 'get',
    });

    return data as PlaylistModel;
  } catch (error) {
    console.log('getPlaylist', error);
  }
};


export const getPlaylistTracks = async () => {
    console.log('## Getting playlists tracks ##');

}
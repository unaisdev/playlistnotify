import { SPOTIFY_API_URL } from '../../constants';
import HttpClient from '../httpClient';
import {PlaylistModel, User} from '../types';

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


export const getPlaylistTracks = async () => {
    console.log('## Getting playlists tracks ##');

}
import {API_URL, SPOTIFY_API_URL} from '../constants';
import HttpClient from '../httpClient';
import {
  PlaylistItem,
  PlaylistModel,
  PlaylistResponse,
  Track,
  User,
} from '../types';
import {AxiosError} from 'axios';

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
      url: `/playlists/${id}/tracks`,
      method: 'get',
    });

    return data;
  } catch (error) {
    console.log('getPlaylistTracks', error);
    throw new Error('error');
  }
};

export const savePlaylistForNotify = async (
  playlistId: string,
  tracks: PlaylistItem[],
  userId: string,
): Promise<boolean> => {
  try {
    const data = await HttpClient<boolean>({
      baseURL: API_URL,
      url: '/addPlaylistForNotify',
      method: 'post',
      data: {
        playlistId: playlistId,
        tracks: tracks,
        userId: userId,
      },
    });
    // .then(({data}) => {
    //   console.log(data);
    //   return data;
    // })
    // .catch((error: AxiosError) => console.log(error.response?.data));

    return data.data;
  } catch {
    return false;
  }
};

export const removePlaylistForNotify = async (
  playlistId: string,
  userId: string,
) => {
  const data = await HttpClient<boolean>({
    baseURL: API_URL,
    url: '/deleteUserPlaylistsForNotify',
    method: 'post',
    data: {
      playlistId: playlistId,
      userId: userId,
    },
  })
    .then(({data}) => {
      console.log(data);
      return data;
    })
    .catch((error: AxiosError) => console.log(error.response?.data));
};

export const isSavedPlaylistForNotify = async (
  playlistId: string,
  userId: string,
) => {
  return await HttpClient<boolean>({
    baseURL: API_URL,
    url: '/isSavedPlaylistsForNotify',
    method: 'post',
    data: {
      playlistId: playlistId,
      userId: userId,
    },
  })
    .then(({data}) => {
      console.log(data);
      return data;
    })
    .catch((error: AxiosError) => console.log(error.response?.data));
};

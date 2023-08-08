import {SPOTIFY_API_URL} from '../constants';
import HttpClient from '../httpClient';
import {PlaylistModel, User} from '../types';

export const getUserProfile = async () => {
  console.log('## Getting user profile data ##00');

  try {
    const {data} = await HttpClient({
      baseURL: SPOTIFY_API_URL,
      url: '/me',
      method: 'get',
    });

    return data as User;
  } catch (error) {
    console.log('getUserProfile', error);

    throw new Error('Error fetching user profile'); // Lanzar un nuevo error con un mensaje descriptivo
  }
};

export const getUserPlaylists = async (
  next?: string,
  accumulatedPlaylists: PlaylistModel[] = [],
): Promise<PlaylistModel[]> => {
  try {
    const {data} = await HttpClient({
      baseURL: SPOTIFY_API_URL,
      url: next || '/me/playlists', // Utiliza el valor de 'next' si está presente, de lo contrario, usa '/me/playlists'
      method: 'get',
    });

    if (!data) return accumulatedPlaylists;

    const allPlaylists = accumulatedPlaylists.concat(data.items || []);

    if (data.next) {
      return await getUserPlaylists(data.next, allPlaylists);
    }
    console.log('## Getting user all playlists data ##');

    return allPlaylists;
  } catch (error) {
    console.log('getUserPlaylists', error);
    return accumulatedPlaylists; // Devolver la lista acumulada en caso de error
  }
};

export const getUserFeaturedPlaylists = async (
  next?: string,
  accumulatedPlaylists: PlaylistModel[] = [],
): Promise<PlaylistModel[]> => {
  try {
    const {data} = await HttpClient({
      baseURL: SPOTIFY_API_URL,
      url: next || '/browse/featured-playlists', // Utiliza el valor de 'next' si está presente, de lo contrario, usa '/me/playlists'
      method: 'get',
    });

    const {message, playlists} = data;

    if (!data) return accumulatedPlaylists;

    return playlists.items;
  } catch (error) {
    console.log('getUserFeaturedPlaylists', error);
    return accumulatedPlaylists; // Devolver la lista acumulada en caso de error
  }
};

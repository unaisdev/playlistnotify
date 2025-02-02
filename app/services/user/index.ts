import {API_URL, SPOTIFY_API_URL} from '../constants';
import HttpClient from '../httpClient';
import {PlaylistModel, User, UserAddedPlaylistsResponse} from '../types';
import {AxiosError} from 'axios';

export const getUserProfile = async () => {
  console.log('## Getting user profile data ##00');

  try {
    const {data} = await HttpClient({
      baseURL: SPOTIFY_API_URL,
      url: '/me',
      method: 'get',
    });

    console.log(data);
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

export const getUserNotifiedPlaylists = async (userId: string) => {
  const {data} = await HttpClient<UserAddedPlaylistsResponse[]>({
    baseURL: API_URL,
    url: '/playlist/getAll', // Utiliza el valor de 'next' si está presente, de lo contrario, usa '/me/playlists'
    method: 'post',
    data: {
      userId: userId,
    },
  });

  return data as UserAddedPlaylistsResponse[];
};

export const registerUser = async (user: User) => {
  console.log('REGISTERING USER: ' + user.followers.total);

  const data = await HttpClient<User>({
    baseURL: API_URL,
    url: '/register', // Utiliza el valor de 'next' si está presente, de lo contrario, usa '/me/playlists'
    method: 'post',
    data: {
      user: user,
    },
  })
    .then(({data}) => {
      console.log(data);
      return data;
    })
    .catch((error: AxiosError) =>
      console.log(error.response?.data, error.response?.status),
    );
};

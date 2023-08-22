export const API_URL = 'https://api-spotify-playlists-0yk7-dev.fl0.io';
export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

//https://github.com/luggit/react-native-config
export const CLIENT_ID = 'df7cd23d00fe4f989f0eaeaa638f03cf';
///////////////////////////////////////////////

export const REDIRECT_URL = 'com.unaicanales.playlistnotify:/oauth';

export const AUTH_DISCOVERY = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export const AUTH_CONFIG = {
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  scopes: [
    'user-read-email',
    'user-read-private',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
  serviceConfiguration: AUTH_DISCOVERY,
};

export const SEARCH_TYPE = {
  PLAYLIST: 'playlist',
  TRACK: 'track',
  ALBUM: 'album',
  ARTIST: 'artist',
  SHOW: 'show',
  EPISODE: 'episode',
  AUDIOBOOK: 'audiobook',
};

export const ASYNC_STORAGE = {
  AUTH_TOKEN: 'AuthToken',
  REFRESH_TOKEN: 'AuthRefreshToken',
  AUTH_TOKEN_EXPIRATION: 'AccessTokenExpiration',
};

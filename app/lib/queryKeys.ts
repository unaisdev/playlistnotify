export const QUERY_KEYS = {
  // User related keys
  USER_PROFILE: 'userProfile',
  USER_PLAYLISTS: 'userPlaylists',
  USER_NOTIFIED_PLAYLISTS: 'userNotifiedPlaylists',

  // Track related keys
  TRACK_DETAIL: 'trackDetail',

  // Search related keys
  SEARCH_PLAYLISTS: 'searchPlaylists',

  // Playlist related keys
  PLAYLIST_DETAIL: 'playlistDetail',
  PLAYLIST_TRACKS: 'playlistTracks',
  PLAYLIST_IS_SAVED: 'playlistIsSaved',

  // Notify related keys
  NOTIFY: {
    all: ['notify'],
    playlist: (playlistId: string, userId?: string) => [
      'notify',
      playlistId,
      userId,
    ],
  },

  playlistTracks: (playlistId: string) =>
    ['playlist', playlistId, 'tracks'] as const,

  // Beta related keys
  BETA_SIGNUP: 'betaSignup',

  // Functions for dynamic keys
  betaSignup: (email: string) => ['beta', 'signup', email] as const,
} as const;
export const betaKeys = {
  all: ['beta'] as const,
  signup: () => [...betaKeys.all, 'signup'] as const,
};

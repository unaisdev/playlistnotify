import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize} from 'react-native-app-auth';

const client_id = 'df7cd23d00fe4f989f0eaeaa638f03cf';

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const useLoging = () => {
  const handleStartSession = useCallback(async () => {
    try {
      const config = {
        clientId: client_id,
        scopes: [
          'user-read-email',
          'user-read-private',
          'playlist-read-private',
          'playlist-read-collaborative',
        ],
        redirectUrl: 'com.playlistnotify://', // Replace with your app's redirect URL
        serviceConfiguration: discovery,
      };

      // Perform the authorization request
      const result = await authorize(config);

      if (result && result.accessToken) {
        console.log(result.accessToken);

        await AsyncStorage.setItem('AuthToken', result.accessToken);
      }
    } catch (error) {
      console.log('useLoging', error);
    }
  }, []);

  return {
    handleStartSession,
  };
};

export default useLoging;

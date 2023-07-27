import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize} from 'react-native-app-auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';

const client_id = 'df7cd23d00fe4f989f0eaeaa638f03cf';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const useLoging = ({navigation}: Props) => {
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
        navigation.replace('Tabs');
      }
    } catch (error) {
      console.log('useLoging', error);
    }
  }, [navigation]);

  return {
    handleStartSession,
  };
};

export default useLoging;

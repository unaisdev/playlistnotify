import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '@app/features/commons/layout/Text';

import useLogin from './hooks/useLogin';
import {RootStackParamList} from '../../navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LoginScreen = ({navigation}: Props) => {
  const {handleLogin, isTokenValid, refreshToken, init} = useLogin(navigation);

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Conéctate con</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Image
          source={require('../../assets/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png')}
          style={styles.spotify_logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  spotify_logo: {
    width: 100,
    height: 40,
    objectFit: 'contain',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    color: 'white',
    width: 160,
    height: 60,
    objectFit: 'contain',
  },
  button_pass: {
    backgroundColor: 'black',
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
});

export default LoginScreen;

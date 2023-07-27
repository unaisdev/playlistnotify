import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useLogin from './hooks/useLogin';
import {RootStackParamList} from '../../navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LoginScreen = ({navigation}: Props) => {
  const {handleStartSession} = useLogin({navigation});

  const handleLogin = () => {
    handleStartSession();
  };

  return (
    <View style={styles.container}>
      <Text>Conéctate con</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Image
          source={require('../../../assets/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png')}
          style={styles.spotify_logo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tabs')}
        style={styles.button_pass}>
        <Text style={{color: 'white'}}>Pasar a los tabs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

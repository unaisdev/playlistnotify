import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const LoginScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('Home');
  };

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
    backgroundColor: 'red',
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

    width: 160,
    height: 60,
    objectFit: 'contain',
  },
});

export default LoginScreen;

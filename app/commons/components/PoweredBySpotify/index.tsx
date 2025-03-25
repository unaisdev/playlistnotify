import Text from '@app/commons/layout/Text';
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';

export const PoweredBySpotify = () => {
  const onPress = () => {
    Linking.openURL('https://developer.spotify.com/');
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={onPress} style={styles.pressable}>
          <Text textType="light" style={styles.text}>
            Powered by
          </Text>
          <Image
            source={require('../../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png')}
            style={styles.spotify_devs_logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerContainer: {
    backgroundColor: '#424242',
    paddingVertical: 8,
    borderRadius: 12,
  },
  text: {fontSize: 12, color: 'white'},
  pressable: {
    columnGap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotify_logo: {
    width: 35,
    height: 35,
    objectFit: 'contain',
  },
  spotify_devs_logo: {
    width: 160,
    height: 40,
    objectFit: 'contain',
  },
});

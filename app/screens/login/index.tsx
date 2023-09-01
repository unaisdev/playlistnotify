import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '@app/features/commons/layout/Text';

import useLogin from './hooks/useLogin';
import {RootStackParamList} from '../../navigation';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LoginScreen = ({navigation}: Props) => {
  const {handleLogin, isTokenValid, refreshToken, init} = useLogin(navigation);
  const {t} = useTranslation();

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Text textType="bold" style={{fontSize: 34}}>
          Playlist Notify
        </Text>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Image
            source={require('../../assets/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png')}
            style={styles.spotify_logo}
          />
          <Text>{t('login.spotify_connect')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <Text textType="light" style={{fontSize: 12}}>
            Powered by
          </Text>
          <Image
            source={require('../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png')}
            style={styles.spotify_devs_logo}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  header: {flex: 1, justifyContent: 'center'},
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 22,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 12,
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
  button: {
    flexDirection: 'row',
    columnGap: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 16,
    paddingHorizontal: 50,
    paddingVertical: 12,
    color: 'white',
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

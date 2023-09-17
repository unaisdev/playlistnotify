import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';

const First = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        entering={FadeIn.duration(900)}
        exiting={FadeOut.duration(300)}
        layout={Layout.duration(1500)}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Playlist Notify</Text>

        <Image
          style={styles.image}
          source={require('../../../assets/images/onboard1.jpg')}
          resizeMode="cover"
        />

        <Text style={styles.subtitle}>¿Cómo funciona la aplicación?</Text>

        <Text style={styles.text}>
          Elige la lista de la que quieres recibir una notificación cuando se
          actualice, <Text style={styles.bold}>desde tu perfil</Text>, como
          desde <Text style={styles.bold}>el buscador</Text>,{' '}
          <Text style={styles.bold}>
            toca en la campana superior derecha, y listo.
          </Text>{' '}
          Las listas que guardes aparecerán en la pantalla principal.
        </Text>

        <Text style={[styles.text, styles.bold]}>
          ¿Quisieras saber qué canciones se han añadido nuevas y cuáles han sido
          eliminadas de una lista en Spotify?
        </Text>
        <Text style={[styles.text, styles.normal]}>
          ¡Esta es la aplicación que estabas buscando!
        </Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  normal: {
    fontWeight: 'normal',
  },
});

export default React.memo(First);

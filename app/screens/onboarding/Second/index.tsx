import React from 'react';
import {View, Text} from 'react-native';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';

const Second = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(900)}
      exiting={FadeOut.duration(300)}
      layout={Layout.duration(1500)}
      style={{flex: 1, justifyContent: 'center', padding: 24}}>
      <View style={{marginBottom: 48}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
          Activa las notificaciones
        </Text>

        <Text style={{fontSize: 16, textAlign: 'left', marginTop: 16}}>
          Para recibir notificaciones en base a las actualizaciones de las
          listas, necesitas dar permisos a esta aplicación en tu dispositivo.
        </Text>

        <View style={{paddingHorizontal: 32, marginTop: 24}}>
          <Text>asdasdasd</Text>
        </View>
      </View>

      <View>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
          Configura una hora
        </Text>

        <Text style={{fontSize: 16, textAlign: 'left', marginTop: 16}}>
          No queremos abrumar a nuestros usuarios constantemente cada vez que se
          añada o elimine una canción. Para ello, establece una hora para
          notificarte cuando una lista se actualiza o deja la que viene por
          defecto.
        </Text>

        <View style={{paddingHorizontal: 32, marginTop: 24}}>
          <Text>asdasdasd</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default React.memo(Second);

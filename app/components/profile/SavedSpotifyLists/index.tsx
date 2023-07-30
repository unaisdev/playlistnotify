import {
  ScrollView,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import PlaylistInfo from './PlaylistInfo';
import {RootStackParamList, RootTabsParamList} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import React from 'react';
import {PlaylistModel} from '../../../services/types';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';

type Props = {
  text: string;
  userOwnedPlaylists: PlaylistModel[];
};

const SavedSpotifyLists = ({userOwnedPlaylists, text}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const scale = useSharedValue(1);
  const containerRef = useRef(null);

  // Función para actualizar la escala y animar el retorno a 1 al soltar el botón
  const handlePress = () => {
    scale.value = withSpring(0.4);
  };

  // Función para restablecer la escala a 1 al soltar el botón
  const handleRelease = () => {
    scale.value = withSpring(1);
  };

  // Define el gestor de eventos animados para el botón
  const gestureHandler = useAnimatedGestureHandler({
    onStart: handlePress,
    onEnd: handleRelease,
  });

  // Define los estilos animados para el contenedor
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handleOpenPlaylist = (id: string) => {
    navigation.navigate('Playlist', {id: id});
    console.log('Openning playlist ' + id);
  };

  return (
    <GestureHandlerRootView>
      <Text style={{padding: 8}}>{text}</Text>
      <FlatList
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 6,
        }}
        showsHorizontalScrollIndicator={false}
        data={userOwnedPlaylists}
        renderItem={({item, index}) => {
          return (
            <Animated.View
              key={item.id}
              entering={FadeInDown.duration(800).delay(index * 300)}
              exiting={FadeOutRight.duration(800)}
              layout={Layout.springify().delay(850)}>
              <TapGestureHandler onGestureEvent={gestureHandler}>
                <TouchableOpacity
                  key={`${item.id}_${index}`}
                  ref={containerRef}
                  onPress={() => handleOpenPlaylist(item.id)}>
                  <Animated.View style={[animatedStyle]}>
                    <PlaylistInfo
                      id={item.id}
                      image_url={item.images[0]?.url}
                      name={item.name}
                    />
                  </Animated.View>
                </TouchableOpacity>
              </TapGestureHandler>
            </Animated.View>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};

export default React.memo(SavedSpotifyLists);

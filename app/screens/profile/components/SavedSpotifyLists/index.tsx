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
import {RootStackParamList, RootTabsParamList} from '../../../../navigation';
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
import {PlaylistModel} from '../../../../services/types';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';

type Props = {
  text: string;
  playlists: PlaylistModel[];
};

const SavedSpotifyLists = ({playlists, text}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const scale = useSharedValue(1);
  const containerRef = useRef(null);

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
      <Text style={{padding: 12, color: 'white'}}>{text}</Text>
      <FlatList
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 6,
        }}
        showsHorizontalScrollIndicator={false}
        data={playlists}
        keyExtractor={item => item.id} // Utiliza una propiedad única como clave
        renderItem={({item, index}) => {
          return (
            <Animated.View
              key={item.id}
              entering={FadeInDown.duration(800).delay(index * 100)}
              exiting={FadeOutRight.duration(800)}>
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
            </Animated.View>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};

export default React.memo(SavedSpotifyLists);

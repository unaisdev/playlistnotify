import {ScrollView, View, Text, Pressable, FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import PlaylistInfo from './PlaylistInfo';
import {RootStackParamList} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import React from 'react';
import {PlaylistModel} from '../../../services/types';

type Props = {
  text: string;
  userOwnedPlaylists: PlaylistModel[];
};

const SavedSpotifyLists = ({userOwnedPlaylists, text}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOpenPlaylist = (id: string) => {
    navigation.navigate('Playlist', {id: id});
    console.log('Openning playlist ' + id);
  };

  return (
    <View>
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
                  <TouchableOpacity
                    key={`${item.id}_${index}`}
                    onPress={() => handleOpenPlaylist(item.id)}>
                    <PlaylistInfo
                      id={item.id}
                      image_url={item.images[0]?.url}
                      name={item.name}
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
        }}
        />
    </View>
  );
};

export default React.memo(SavedSpotifyLists);

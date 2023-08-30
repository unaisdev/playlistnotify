import {
  ScrollView,
  View,
  Pressable,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useRef} from 'react';
import PlaylistInfo from './PlaylistInfo';
import {RootStackParamList, RootTabsParamList} from '../../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import React from 'react';
import {PlaylistModel} from '../../../../services/types';
import Text from '@app/features/commons/layout/Text';

type Props = {
  text: string;
  playlists: PlaylistModel[] | undefined;
  isLoadingData: boolean;
};

const SavedSpotifyLists = ({playlists, text, isLoadingData}: Props) => {
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
  };

  const playlistsNullOrEmptyText = isLoadingData ? (
    <View style={styles.emptyListContainer}>
      <ActivityIndicator />
    </View>
  ) : playlists?.length === 0 ? (
    <View style={styles.emptyListContainer}>
      <Text>No tienes playlists propias / guardadas</Text>
    </View>
  ) : null;

  return (
    <View style={{height: 180}}>
      <Text style={{padding: 12}}>{text}</Text>
      <View style={{alignItems: 'center'}}>
        {playlistsNullOrEmptyText}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(SavedSpotifyLists);

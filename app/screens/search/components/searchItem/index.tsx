import React from 'react';
import {Linking, Pressable, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import Text from '@app/features/commons/layout/Text';

import Feather from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../../../navigation';
import {PlaylistModel} from '../../../../services/types';

type Props = {
  item: PlaylistModel;
  index: number;
};

const SearchItem = ({item, index}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Animated.View
      key={item.id}
      entering={FadeInDown.duration(300).delay(index * 100)}
      exiting={FadeOutRight.duration(300)}
      layout={Layout.duration(800).delay(index * 100)}
      style={{width: '100%'}}>
      <Pressable
        onPress={() => {
          navigation.navigate('Playlist', {id: item.id});
        }}
        key={index}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          marginVertical: 8,
          gap: 12,
        }}>
        <Image
          style={{width: 58, height: 58}}
          source={{uri: item.images[0]?.url}}
        />
        <View
          style={{
            height: '100%',
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text textType="bold" numberOfLines={2} style={{width: 260}}>
              {item.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text textType="light" style={{fontSize: 10}}>
              {item.tracks.total} canciones
            </Text>
            <Pressable
              onPress={() => {
                Linking.openURL(item.owner.uri);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <Feather name="user" size={8} color="black" />
              <Text textType="regular" style={{fontSize: 10}}>
                {item.owner?.display_name}
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(SearchItem);

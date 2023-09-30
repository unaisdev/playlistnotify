import React from 'react';

import {useTranslation} from 'react-i18next';
import {Image, Linking, Pressable, View} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

import {PlaylistModel} from '@app/services/types';
import Text from '@app/features/commons/layout/Text';
import {RootStackParamList} from '@app/navigation';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  selectedDisplay: string;
  item: PlaylistModel;
  index: number;
};

const PlaylistItem = ({item, index, selectedDisplay}: Props) => {
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Animated.View
      key={item.id}
      entering={FadeInDown.duration(300).delay(index * 25)}
      exiting={FadeOutRight.duration(300)}
      layout={Layout.duration(800).delay(400)}
      style={{}}>
      <Pressable
        onPress={() => {
          navigation.navigate('Playlist', {id: item.id});
        }}
        key={index}
        style={
          selectedDisplay === 'square' && {
            width: selectedDisplay === 'square' ? '100%' : 58,
            flex: 1,
            paddingHorizontal: 12,
            columnGap: 10,
          }
        }>
        <View
          style={{
            flexDirection: selectedDisplay === 'square' ? 'column' : 'row',
            justifyContent: 'flex-start',
            columnGap: 12,
            rowGap: 10,
          }}>
          <Image
            resizeMode={'contain'}
            style={{
              width: selectedDisplay === 'square' ? '100%' : 58,
              aspectRatio: 1,
            }}
            source={{uri: item.images[0]?.url}}
          />
          {selectedDisplay === 'square' ? null : ( // Ocultar imagen en 'square'
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'center',
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
                  {item.tracks.total} {t('tracks')}
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
                  <Feather
                    name="user"
                    size={8}
                    color={isDarkMode ? 'white' : 'black'}
                  />
                  <Text textType="regular" style={{fontSize: 10}}>
                    {item.owner?.display_name}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
          {selectedDisplay === 'square' && ( // Mostrar solo el nombre en 'square'
            <Text textType="semi" numberOfLines={1}>
              {item.name}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(PlaylistItem);

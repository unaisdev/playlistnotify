import React from 'react';
import {
  View,
  Text,
  Linking,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import {PlaylistModel} from '../../../../services/types';
import SearchItem from '../searchItem';

type Props = {
  searchResults: PlaylistModel[];
};

const SearchList = ({searchResults}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        marginHorizontal: 12,
        paddingVertical: 6,
      }}>
      {searchResults.length === 0 && (
        <Animated.Text
          entering={FadeInDown.duration(800)}
          exiting={FadeOutRight.duration(800)}
          layout={Layout.duration(800)}
          style={{textAlign: 'center'}}
          //   className="p-4 text-xs text-gray-400  text-center"
        >
          Haz una búsqueda para ver aquí los resultados
        </Animated.Text>
      )}
      {searchResults.map((item, index) => (
        <SearchItem key={item.id} item={item} index={index} />
      ))}
    </ScrollView>
  );
};

export default React.memo(SearchList);

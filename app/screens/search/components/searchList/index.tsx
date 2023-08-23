import React from 'react';
import {
  View,
  Text,
  Linking,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
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
  if (searchResults.length === 0)
    return (
      <Text
        style={{textAlign: 'center'}}
        //   className="p-4 text-xs text-gray-400  text-center"
      >
        Haz una búsqueda para ver aquí los resultados
      </Text>
    );

  return (
    <FlatList
      data={searchResults}
      renderItem={({item, index}) => {
        return <SearchItem index={index} item={item} />;
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        marginHorizontal: 12,
        paddingVertical: 6,
      }}
    />
  );
};

export default React.memo(SearchList);

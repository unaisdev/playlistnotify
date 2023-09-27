import Layout from '@app/features/commons/layout/TabLayout';
import Text from '@app/features/commons/layout/Text';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated from 'react-native-reanimated';

type Category = {
  name: string;
  color: string;
  image_source: string;
};

const categories: Category[] = [
  {
    name: 'Revistas',
    color: '#B71C1C',
    image_source:
      '../../../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png',
  },
  {
    name: 'Colaboradores',
    color: '#880E4F',
    image_source:
      '../../../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png',
  },
  {
    name: 'Listas de la comunidad',
    color: '#33691E',
    image_source:
      '../../../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png',
  },
  {
    name: 'Prueba',
    color: '#1A237E',
    image_source:
      '../../../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png',
  },
  {
    name: 'Categoria prueba',
    color: '#01579B',
    image_source:
      '../../../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png',
  },
  {
    name: 'A ver',
    color: '#BF360C',
    image_source:
      '../../../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png',
  },
];

const Item = ({item}: {item: Category}) => {
  return (
    <TouchableOpacity style={[styles.card, {backgroundColor: item.color}]}>
      <View style={styles.cardContainer}>
        <Image
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            top: 0,
            left: 0,
            transform: [{rotate: '0deg'}],
          }}
          resizeMode="contain"
          source={require('../../../../assets/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png')}
        />
        <Text textType="bold" style={{textAlign: 'right', color: 'white'}}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Categories = () => {
  return (
    <Animated.FlatList
      ListHeaderComponent={props => {
        return (
          <Text style={{marginBottom: 12,}} textType="bold">
            Explora todo
          </Text>
        );
      }}
      ListHeaderComponentStyle={{width: '100%'}}
      numColumns={2}
      data={categories}
      renderItem={({item, index}) => {
        console.log(item.name);
        return <Item item={item} />;
      }}
      columnWrapperStyle={{
        width: '100%',
        columnGap: 6,
      }}
      contentContainerStyle={styles.categoriesContainer}
    />
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  card: {
    flex: 1,
    height: 200,
    overflow: 'hidden',
    borderRadius: 12,
    padding: 12,
    marginBottom: 6,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default React.memo(Categories);

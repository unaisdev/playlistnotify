import React from 'react';

import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';
import {FlatList, StyleSheet, View} from 'react-native';
import {Layout as LayoutR} from 'react-native-reanimated';

import i18n from '@app/features/locales/i18next';
import Text from '@app/features/commons/layout/Text';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';

import Item from './Item';
import OrderBy from '../OrderBy';
import {PlaylistModel} from '../../../../services/types';

type Props = {
  profilePlaylists: PlaylistModel[];
  selectedDisplay: string;
};

const PlaylistList = ({profilePlaylists, selectedDisplay}: Props) => {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  const numColumns = selectedDisplay === 'square' ? 2 : 1;

  if (profilePlaylists.length === 0)
    return (
      <View style={{flex: 1, marginTop: 20}}>
        <Text style={{fontSize: 12, textAlign: 'center'}}>
          Parece que ninguna lista corresponde con tus filtros
        </Text>
      </View>
    );

  return (
    <Animated.FlatList
      key={numColumns}
      style={styles.flatList}
      data={profilePlaylists}
      scrollEnabled
      keyExtractor={(item, index) => item.id}
      itemLayoutAnimation={LayoutR.duration(500).delay(500)}
      renderItem={({item, index}) => {
        return (
          <Item index={index} item={item} selectedDisplay={selectedDisplay} />
        );
      }}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.containerFlatlist,
        {
          rowGap: selectedDisplay === 'square' ? 20 : 10,
          paddingHorizontal: selectedDisplay === 'square' ? 0 : 12,
        },
      ]}
    />
  );
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    flatList: {
      flex: 1,
      backgroundColor: isDarkMode ? '#212121' : 'white',
    },
    containerFlatlist: {
      flex: 1,
      paddingVertical: 10,
      columnGap: 30,
    },
  });
};

export default React.memo(PlaylistList);

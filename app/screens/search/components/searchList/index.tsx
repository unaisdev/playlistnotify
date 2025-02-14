import React from 'react';

import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {Layout as LayoutR} from 'react-native-reanimated';

import Text from '@app/features/commons/layout/Text';
import Layout from '@app/features/commons/layout/TabLayout';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';

import SearchItem from '../searchItem';
import {PlaylistModel} from '../../../../services/types';

type Props = {
  searchResults: PlaylistModel[];
};

const SearchList = ({searchResults}: Props) => {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  return (
    <Animated.FlatList
      style={styles.flatList}
      data={searchResults}
      itemLayoutAnimation={LayoutR.duration(500)}
      renderItem={({item, index}) => {
        return <SearchItem index={index} item={item} />;
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerFlatlist}
    />
  );
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    flatList: {
      backgroundColor: isDarkMode ? '#212121' : 'white',
    },
    containerFlatlist: {
      paddingHorizontal: 8,
      paddingVertical: 10,
      rowGap: 10,
    },
  });
};

export default React.memo(SearchList);

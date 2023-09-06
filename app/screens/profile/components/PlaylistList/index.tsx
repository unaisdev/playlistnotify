import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {PlaylistModel} from '../../../../services/types';
import Text from '@app/features/commons/layout/Text';
import i18n from '@app/features/locales/i18next';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {Layout as LayoutR} from 'react-native-reanimated';
import Layout from '@app/features/commons/layout/TabLayout';
import Animated from 'react-native-reanimated';
import Item from './Item';

type Props = {
  searchResults: PlaylistModel[];
};

const PlaylistList = ({searchResults}: Props) => {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  return (
    <Animated.FlatList
      style={styles.flatList}
      data={searchResults}
      itemLayoutAnimation={LayoutR.duration(500)}
      renderItem={({item, index}) => {
        return <Item index={index} item={item} />;
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

export default React.memo(PlaylistList);

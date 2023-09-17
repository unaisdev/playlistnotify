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
};

const PlaylistList = ({profilePlaylists}: Props) => {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  return (
    <Animated.FlatList
      style={styles.flatList}
      data={profilePlaylists}
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
      paddingBottom: 10,
      rowGap: 10,
    },
  });
};

export default React.memo(PlaylistList);

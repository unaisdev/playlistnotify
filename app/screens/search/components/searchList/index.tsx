import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {PlaylistModel} from '../../../../services/types';
import SearchItem from '../searchItem';
import Text from '@app/features/commons/layout/Text';
import i18n from '@app/features/locales/i18next';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import Layout from '@app/features/commons/layout/TabLayout';

type Props = {
  searchResults: PlaylistModel[];
};

const SearchList = ({searchResults}: Props) => {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  if (searchResults.length === 0)
    return (
      <Layout style={{flex: 0, height: '100%'}}>
        <Text style={{textAlign: 'center'}}>{t('search.search_for')}</Text>
      </Layout>
    );

  return (
    <FlatList
      style={styles.flatList}
      data={searchResults}
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
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
  });
};

export default React.memo(SearchList);

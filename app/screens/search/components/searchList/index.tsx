import React from 'react';
import {FlatList} from 'react-native';
import {PlaylistModel} from '../../../../services/types';
import SearchItem from '../searchItem';
import Text from '@app/features/commons/layout/Text';
import i18n from '@app/services/i18next';
import {withTranslation} from 'react-i18next';

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
        {i18n.t('search.search_for')}
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
        //check avoiding bottomNavBar margin
        paddingBottom: 96,
      }}
    />
  );
};

export default withTranslation()(React.memo(SearchList));

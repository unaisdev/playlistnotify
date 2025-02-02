import React from 'react';

import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

import {useSearch} from './hooks/useSearch';
import SearchBar from './components/searchBar';
import SearchList from './components/searchList';
import Categories from './components/Categories';

const SearchPlaylistScreen = () => {
  const {
    data,
    handleSearchTextChange,
    isFetching,
    isLoading,
    handleBlur,
    handleClear,
    handleFocus,
    inputRef,
    searchPhrase,
  } = useSearch();

  const handleViewPress = () => {
    console.log('pressssss');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleViewPress}>
      <View style={{flex: 1}}>
        <SearchBar
          handleBlur={handleBlur}
          handleClear={handleClear}
          handleFocus={handleFocus}
          inputRef={inputRef}
          searchPhrase={searchPhrase}
          handleSearchTextChange={handleSearchTextChange}
          isFetching={isFetching}
          isLoading={isLoading}
        />
        {!data || data?.length === 0 ? (
          <Categories />
        ) : (
          !isLoading && (
            <SearchList searchResults={data.filter(data => data != null)} />
          )
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchPlaylistScreen;

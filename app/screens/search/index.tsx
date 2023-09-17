import React, {useRef, useState} from 'react';

import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Layout from '@app/features/commons/layout/TabLayout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useSearch} from './hooks/useSearch';
import SearchBar from './components/searchBar';
import SearchList from './components/searchList';

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
        <SearchList searchResults={data || []} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchPlaylistScreen;

import React, {useState, useRef} from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import SearchList from './components/searchList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useSearch} from './hooks/useSearch';
import {useNavigation} from '@react-navigation/native';
import SearchBar from './components/searchBar';
import Layout from '@app/features/commons/layout/TabLayout';

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

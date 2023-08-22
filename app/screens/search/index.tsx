import React, {useState, useRef} from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import SearchList from './components/searchList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useSearch} from './hooks/useSearch';
import {useNavigation} from '@react-navigation/native';
import SearchBar from './components/searchBar';

const SearchPlaylistScreen = () => {
  const navigation = useNavigation();
  const {data, handleSearchTextChange, isFetching, isLoading} = useSearch();

  return (
    <View style={styles.container}>
      <SearchBar
        handleSearchTextChange={handleSearchTextChange}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <SearchList searchResults={data || []} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchBarContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  searchBar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 13,
    color: '#fff',
    flexGrow: 1,
    marginLeft: 12,
  },
});

export default SearchPlaylistScreen;

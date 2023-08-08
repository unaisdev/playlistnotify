import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlaylistModel } from '../../services/types';
import SearchList from './searchList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchSearchPlaylists } from '../../services/search'; // Import your fetch function
import { useQuery } from '@tanstack/react-query';
import { useSearch } from './hooks/useSearch';

const Search = () => {
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  const { searchPhrase, handleSearchTextChange, data, isLoading, isFetching} = useSearch()

  const handlePress = () => {
    // Handle press logic
  };

  const handleBlur = () => {
    // Handle blur logic
  };

  const handleClear = () => {
    inputRef.current?.blur();
    // setSearchPhrase('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBarContainer}
        onPress={handlePress}
        activeOpacity={1}>
        <View style={styles.searchBar}>
          <View>
            {isFetching ? (
              <ActivityIndicator size={'small'} color={'gray'} />
            ) : (
              <MaterialIcons name="search" size={20} color="white" />
            )}
          </View>

          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="¿En qué lista quieres activar las notificaciones?"
            value={searchPhrase}
            onChangeText={handleSearchTextChange}
            onBlur={handleBlur}
            onFocus={() => {}}
            placeholderTextColor="#d3d3d3"
          />
          <View>
            {data?.length === 0 && (
              <TouchableOpacity onPress={handleClear}>
                {/* Renderizar tu icono de limpiar aquí */}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <SearchList searchResults={data || []} />
    </View>
  );
};

export default Search;

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

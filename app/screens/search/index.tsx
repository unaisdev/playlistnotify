import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Search from '../../components/search';

const SearchPlaylistScreen = () => {
  return (
    <View style={styles.container}>
      <Search />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SearchPlaylistScreen;

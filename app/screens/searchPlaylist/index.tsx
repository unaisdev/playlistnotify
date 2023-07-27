import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const SearchPlaylistScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SEARCH</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchPlaylistScreen;

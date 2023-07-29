import React, {useCallback, useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import { getUserPlaylists, getUserProfile } from '../../services/user';

const HomeScreen = () => {

  const init = async () => {
    const user = await getUserProfile()
  } 

  useEffect(() => {
    init()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hola Home</Text>
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

export default HomeScreen;

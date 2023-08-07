import React, {useCallback, useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {getUserPlaylists, getUserProfile} from '../../services/user';
import {useUserContext} from '../../containers/userContext';
import {useQuery} from '@tanstack/react-query';

const HomeScreen = () => {
  const {setUser} = useUserContext();
  const {data, isLoading, error, failureReason} = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
    
  });

  if(data) {
    console.log("!!!!!!!!!!!!!!!!!!!!!")
    console.log(data)
  }

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

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

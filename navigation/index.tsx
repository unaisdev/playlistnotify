import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
// import SearchPlaylistScreen from '../screens/searchPlaylist';
import {Text, View} from 'react-native';

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
};

export type RootTabsParamList = {
  Home: undefined;
  Login: undefined;
  SearchPlaylist: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

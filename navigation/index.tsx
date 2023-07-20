import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
};

export type RootTabsParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = AnimatedTabBarNavigator<RootTabsParamList>();

const Tabs = () => (
  <Tab.Navigator
    appearance={{}}
    tabBarOptions={{
      activeTintColor: '#2F7C6E',
      inactiveTintColor: '#222222',
    }}>
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

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

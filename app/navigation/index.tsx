import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
// import SearchPlaylistScreen from '../screens/searchPlaylist';
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import SearchPlaylistScreen from '../screens/searchPlaylist';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';

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
const Tab = createBottomTabNavigator<RootTabsParamList>();

const TabBar = (props: BottomTabBarProps) => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      layout={Layout.duration(1500)}>
      <BottomTabBar {...props} />
    </Animated.View>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={() => ({
        animation: 'fade',
        tabBarStyle: {
          paddingTop: 0,
          backgroundColor: '#191414',
        },
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SearchPlaylist"
        component={SearchPlaylistScreen}
        options={() => ({headerShown: false, animation: FadeIn})}
      />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
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

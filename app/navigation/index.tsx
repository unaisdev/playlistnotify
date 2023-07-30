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
import ProfileScreen from '../screens/profile';
import {Text} from 'react-native';
import ProfileImageButton from '../components/header/ProfileImageButton';
import GoBackButton from '../components/header/GoBackButton';
import {PlaylistHeader, TabHeader} from '../components/header';
import PlaylistScreen from '../screens/playlist';

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
};

export type RootTabsParamList = {
  Home: undefined;
  Login: undefined;
  Profile: undefined;
  SearchPlaylist: undefined;
  Playlist: {id: string};
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
        header: props => <TabHeader />,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => {
            return (
              <Text>
                ¡Bienvenido, <Text>nombre de usuario</Text>!
              </Text>
            );
          },
          headerRight: () => <ProfileImageButton />,
          headerTitle: () => <></>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => <></>,
          headerLeft: () => <GoBackButton />,
          headerTitle: () => <Text>Tu perfil</Text>,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="SearchPlaylist"
        component={SearchPlaylistScreen}
        options={{
          headerRight: () => <></>,
          headerLeft: () => <></>,
          headerTitle: () => <></>,
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={PlaylistScreen}
        options={{header: () => <PlaylistHeader />, tabBarButton: () => null}}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

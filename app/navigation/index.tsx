import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
// import SearchPlaylistScreen from '../screens/searchPlaylist';
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import SearchPlaylistScreen from '../screens/search';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import ProfileScreen from '../screens/profile';
import {Text} from 'react-native';
import PlaylistScreen from '../screens/playlist';
import useLogin from '../screens/login/hooks/useLogin';
import {useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabHeader} from '../features/commons/header';

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
  Playlist: {id: string};
};

export type RootTabsParamList = {
  Home: undefined;
  Profile: undefined;
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
        header: props => <TabHeader props={props} />,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: () => <></>,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          tabBarLabel: () => <></>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: () => <></>,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="SearchPlaylist"
        component={SearchPlaylistScreen}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: () => <></>,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
          tabBarLabel: () => <></>,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
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
        <Stack.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

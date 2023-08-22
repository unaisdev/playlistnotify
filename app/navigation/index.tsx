import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TabHeader} from '../features/commons/header';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import ProfileScreen from '../screens/profile';
import PlaylistScreen from '../screens/playlist';
import SearchPlaylistScreen from '../screens/search';
import {fetchUserProfile} from '@app/features/commons/hooks/useUser';

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
  const {user} = fetchUserProfile();

  if (!user) return;

  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={() => ({
        tabBarActiveTintColor: 'black',
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
        header: props => <TabHeader {...props} />,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: () => <></>,
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
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
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={color}
            />
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

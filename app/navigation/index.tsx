import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '@app/screens/home';
import LoginScreen from '@app/screens/login';
import ProfileScreen from '@app/screens/profile';
import PlaylistScreen from '@app/screens/playlist';
import SearchPlaylistScreen from '@app/screens/search';
import {fetchUserProfile} from '@app/features/commons/hooks/useUser';
import SettingsScreen from '@app/screens/settings';
import TabHeader from '@app/navigation/components/TabHeader';
import TabBar from './components/TabBar';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {useEffect} from 'react';
import {getThemeFromStorage} from '@app/services/storage';
import OnBoarding from '@app/screens/onboarding';

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
  OnBoarding: undefined;
  Playlist: {id: string};
};

export type RootTabsParamList = {
  Home: undefined;
  Profile: undefined;
  SearchPlaylist: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabsParamList>();

const Tabs = () => {
  const {user} = fetchUserProfile();

  if (!user) return;

  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={() => ({
        orientation: 'portrait_up',
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          paddingTop: 0,
          backgroundColor: '#000',
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
        options={({route}) => ({
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: () => <></>,
          tabBarButton: () => null,
        })}
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
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: () => <></>,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {isDarkMode, setTheme} = useTheme();

  useEffect(() => {
    const init = async () => {
      const themeStorage = await getThemeFromStorage();
      console.log('themeStorage');
      console.log(themeStorage);
      if (themeStorage) setTheme(themeStorage);
    };

    init();
  }, []);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          orientation: 'portrait_up',
        }}>
        {/* <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        /> */}
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

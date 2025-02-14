import {useEffect} from 'react';

import HomeScreen from '@app/screens/home';
import LoginScreen from '@app/screens/login';
import ProfileScreen from '@app/screens/profile';
import PlaylistScreen from '@app/screens/playlist';
import SettingsScreen from '@app/screens/settings';
import SearchPlaylistScreen from '@app/screens/search';
import {getThemeFromStorage} from '@app/services/storage';
import TabHeader from '@app/navigation/components/TabHeader';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {fetchUserProfile} from '@app/features/commons/hooks/useUser';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Monicon} from '@monicon/native';

import TabBar from './components/TabBar';
import PlaylistsForNotifyScreen from '@app/screens/playlists-for-notify';

import BootSplash from 'react-native-bootsplash';
import {useForbiddenError} from '@app/hooks/useForbiddenError';
import Layout from '@app/features/commons/layout/TabLayout';
import {Text} from 'react-native-gesture-handler';
import {BetaScreen} from '@app/screens/beta';

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
  OnBoarding: undefined;
  Playlist: {id: string};
};

export type RootTabsParamList = {
  Home: undefined;
  Profile: undefined;
  PlaylistsForNotify: undefined;
  SearchPlaylist: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabsParamList>();

const Tabs = () => {
  const {user} = fetchUserProfile();

  if (!user) return null;

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
        component={PlaylistsForNotifyScreen}
        options={{
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: () => <></>,
          tabBarIcon: ({color, size, focused}) => (
            <Monicon
              name="mdi:home"
              color={color}
              size={size}
              strokeWidth={focused ? 2 : 1}
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
            <Monicon
              name="mdi:search"
              color={color}
              size={size}
              strokeWidth={focused ? 2 : 1}
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
      <Tab.Screen
        name="PlaylistsForNotify"
        component={PlaylistsForNotifyScreen}
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
  const {error} = useForbiddenError();

  useEffect(() => {
    const init = async () => {
      const themeStorage = await getThemeFromStorage();
      console.log('themeStorage');
      console.log(themeStorage);
      if (themeStorage) setTheme(themeStorage);

      BootSplash.isVisible().then(value => console.log('VISIBLE' + value));
      BootSplash.hide({fade: true});
    };

    init();
  }, []);

  if (error) {
    return <BetaScreen />;
  }

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

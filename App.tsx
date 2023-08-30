import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import StackNavigation from './app/navigation';
import {UserProvider} from './app/containers/userContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetProvider} from './app/containers/bottomSheetContext';
import {I18nextProvider} from 'react-i18next';
import i18n from '@app/features/locales/i18next';
import {StatusBar} from 'react-native';
import {ThemeProvider} from '@app/containers/themeContext';
import MyStatusBar from '@app/features/commons/components/StatusBar';

const queryClient = new QueryClient();

const App = () => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <BottomSheetProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <MyStatusBar />
                <StackNavigation />
              </GestureHandlerRootView>
            </BottomSheetProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default App;

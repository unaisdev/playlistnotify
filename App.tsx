if (__DEV__) {
  require('./ReactotronConfig');
}

import React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import StackNavigation from './app/navigation';
import {UserProvider} from './app/containers/UserContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {I18nextProvider} from 'react-i18next';
import i18n from '@app/features/locales/i18next';
import {StatusBar} from 'react-native';
import {ThemeProvider} from '@app/containers/ThemeContext';
import MyStatusBar from '@app/features/commons/components/StatusBar';

import {BottomSheetHomeProvider} from '@app/containers/BottomSheetHomeContext';
import GlobalContext from '@app/containers';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <QueryClientProvider client={queryClient}>
        <GlobalContext>
          <GestureHandlerRootView style={{flex: 1}}>
            <MyStatusBar />
            <StackNavigation />
          </GestureHandlerRootView>
        </GlobalContext>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default App;

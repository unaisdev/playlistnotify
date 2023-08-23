import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import StackNavigation from './app/navigation';
import {UserProvider} from './app/containers/userContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetProvider} from './app/containers/bottomSheetContext';
import {I18nextProvider} from 'react-i18next';
import i18n from '@app/services/i18next';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <BottomSheetProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <StackNavigation />
            </GestureHandlerRootView>
          </BottomSheetProvider>
        </UserProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;

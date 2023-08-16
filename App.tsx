import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import StackNavigation from './app/navigation';
import {UserProvider} from './app/containers/userContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetProvider} from './app/containers/bottomSheetContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BottomSheetProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <StackNavigation />
          </GestureHandlerRootView>
        </BottomSheetProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;

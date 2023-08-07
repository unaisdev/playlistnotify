import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StackNavigation from './app/navigation';
import { UserProvider } from './app/containers/userContext';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
      <StackNavigation />

      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;

import React from 'react';

import { QueryClientProvider, QueryClient } from 'react-query';

import AppNavigator from './navigators';
import {ErrorBoundary} from './screens/error_screen/error_boundary';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>      
        <ErrorBoundary>
          <AppNavigator />
        </ErrorBoundary>
      </QueryClientProvider>
  );
}

export default App;

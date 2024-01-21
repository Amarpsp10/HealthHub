import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {AppNavigator} from './navigators/AppNavigator';
import {useInitialRootStore} from './store';

const App: React.FC = () => {
  const {rehydrated} = useInitialRootStore(() => {});

  if (!rehydrated) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;

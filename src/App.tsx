import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {AppNavigator} from './navigators/AppNavigator';
import {useInitialRootStore} from './store';
import BootSplash from 'react-native-bootsplash';

const App: React.FC = () => {
  const {rehydrated} = useInitialRootStore(() => {
    BootSplash.hide({fade: true});
  });

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

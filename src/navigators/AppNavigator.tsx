import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator';
import {ThemeProvider} from '@rneui/themed';
import reactNativeElementsTheme from '../theme/reactNativeElementsTheme';
import LoginScreen from '../screens/LoginScreen';
import AuthProvider, {AuthContext} from './AuthContext';

export type AppStackParamList = {
  HomeTabBar: undefined;
  Login: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

export const AppStack: React.FC = () => {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={user ? 'HomeTabBar' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      <>
        {user ? (
          <Stack.Screen name="HomeTabBar" component={TabNavigator} />
        ) : null}
      </>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <ThemeProvider theme={reactNativeElementsTheme}>
      <AuthProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

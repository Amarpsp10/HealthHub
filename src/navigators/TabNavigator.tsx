import React from 'react';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import {HomeScreen, WorkInProgressScreen, ProfileScreen} from '../screens';
import {View, ViewStyle} from 'react-native';
import {colors, spacing} from '../theme';
import {Icon} from '@rneui/themed';
import {Text} from '../components';

export type TabParamList = {
  Home: undefined;
  Health: undefined;
  Profile: undefined;
};

export type TabbarScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: $tabBar,
        headerShown: false,
        tabBarShowLabel: false,
        headerBackgroundContainerStyle: {
          backgroundColor: colors.palette.neutral100,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={focused ? $tabBarActive : $tabBarInactive}>
              <Icon
                type="material-community"
                color={focused ? colors.primary : colors.text}
                name={focused ? 'home-variant' : 'home-variant-outline'}
              />
              <Text
                size="xs"
                weight="semiBold"
                style={{color: focused ? colors.primary : colors.textDim}}>
                Home
              </Text>
            </View>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Health"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={focused ? $tabBarActive : $tabBarInactive}>
              <Icon
                type="material-community"
                color={focused ? colors.primary : colors.text}
                name={
                  focused ? 'bottle-tonic-plus' : 'bottle-tonic-plus-outline'
                }
              />
              <Text
                size="xs"
                weight="semiBold"
                style={{color: focused ? colors.primary : colors.textDim}}>
                Health
              </Text>
            </View>
          ),
        }}
        component={WorkInProgressScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={focused ? $tabBarActive : $tabBarInactive}>
              <Icon
                type="material-community"
                color={focused ? colors.primary : colors.text}
                name={focused ? 'account-circle' : 'account-circle-outline'}
              />
              <Text
                size="xs"
                weight="semiBold"
                style={{color: focused ? colors.primary : colors.textDim}}>
                Profile
              </Text>
            </View>
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const $tabBar: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: colors.palette.neutral100,
  elevation: 10,
  height: 70,
};

const $tabBarActive: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.small,
  borderRadius: 35,
};

const $tabBarInactive: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.small,
};

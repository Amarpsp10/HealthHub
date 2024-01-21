import React from 'react';
import {ViewStyle} from 'react-native';
import LottieView from 'lottie-react-native';
import {Screen, Text} from '../components';
import {AppStackScreenProps} from '../navigators/AppNavigator';
import {colors} from '../theme';

export const WorkInProgressScreen = ({
  route,
}: AppStackScreenProps<'HomeTabBar'>) => {
  return (
    <Screen contentContainerStyle={$container}>
      <LottieView
        autoPlay={true}
        loop
        source={require('../../assets/lottie/work-in-progress.json')}
        style={{width: 300, height: 300}}
      />
      <Text>{route.name} Work in progress...</Text>
    </Screen>
  );
};

const $container: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.background,
};

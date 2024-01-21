import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {colors} from '../../theme';

interface BaseScreenProps {
  children?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

export const Screen: React.FC<BaseScreenProps> = props => {
  const {
    backgroundColor = colors.background,
    contentContainerStyle,
    children,
  } = props;

  return (
    <View style={[$containerStyle, {backgroundColor}, contentContainerStyle]}>
      {children}
    </View>
  );
};

const $containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

import {Icon} from '@rneui/themed';
import React from 'react';
import {ViewStyle} from 'react-native';
import {colors, spacing} from '../../theme';

export const BackButton = ({
  style,
  onPress,
}: {
  style?: ViewStyle;
  onPress: () => void;
}) => {
  return (
    <Icon
      size={25}
      type="material-community"
      color={colors.text}
      backgroundColor={colors.lightBackground}
      style={style}
      iconStyle={{padding: spacing.small}}
      containerStyle={{borderRadius: 50}}
      name="chevron-left"
      onPress={onPress}
    />
  );
};

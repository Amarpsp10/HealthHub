import React from 'react';
import {View, ViewStyle} from 'react-native';

const Divider: React.FC<{
  style?: ViewStyle;
  size?: number;
  horizontal?: boolean;
}> = ({style, size, horizontal}) => {
  return (
    <View
      style={[
        $divider,
        style,
        {borderWidth: size || 0.4, height: horizontal ? '100%' : 0},
      ]}
    />
  );
};

const $divider: ViewStyle = {
  borderColor: '#00000014',
  backgroundColor: '#00000014',
};

export default Divider;

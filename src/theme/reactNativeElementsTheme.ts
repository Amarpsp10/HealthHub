import {createTheme} from '@rneui/themed';
import {spacing} from './spacing';
import {colors} from '.';

const reactNativeElementsTheme = createTheme({
  components: {
    Button: {
      color: colors.primary,
      buttonStyle: {
        paddingVertical: spacing.small,
        borderRadius: 20,
      },
      titleStyle: {fontWeight: 'bold'},
    },
    Icon: {
      iconStyle: {borderRadius: 100},
      underlayColor: 'silver',
    },
  },
});

export default reactNativeElementsTheme;

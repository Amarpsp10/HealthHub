import React, {useContext, useEffect, useRef, useState} from 'react';
import {Screen, Text} from '../components';
import {AuthContext} from '../navigators/AuthContext';
import {AppStackScreenProps} from '../navigators/AppNavigator';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  $flexColumnCenterStyle,
  $flexRowCenterStyle,
  colors,
  spacing,
} from '../theme';
import {Svg, SvgUri} from 'react-native-svg';
import {Image} from '@rneui/themed';
import Logo from '../../assets/images/logo.png';
import GoogleLogo from '../../assets/images/google.png';

const LoginScreen: React.FC<AppStackScreenProps<'Login'>> = ({navigation}) => {
  const {googleLogin, user} = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const slide = useRef(new Animated.Value(0)).current;
  var slideRange = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, -50],
  });

  useEffect(() => {
    bottomSlide();
  }, []);

  const bottomSlide = () => {
    Animated.spring(slide, {
      toValue: 1,
      damping: 5,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (user) {
      navigation.replace('HomeTabBar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onPressGoogleLogin = () => {
    setLoading(true);
    setError(null);
    googleLogin().then(result => {
      console.log(result);
      if (result.error) {
        setError(result.error);
      }
      setLoading(false);
    });
  };
  return (
    <Screen contentContainerStyle={$containerStyle}>
      <View
        style={[
          $flexColumnCenterStyle,
          {padding: spacing.medium, gap: spacing.small},
        ]}>
        <Image
          source={Logo}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            padding: spacing.small,
          }}
        />
        <View style={$flexColumnCenterStyle}>
          <Text
            size="xxl"
            weight="extraBold"
            style={{color: colors.background}}>
            Welcome To
          </Text>
          <Text
            size="xl"
            weight="extraBold"
            style={{color: colors.background, fontWeight: '800'}}>
            Health Hub
          </Text>
        </View>
      </View>
      <Animated.View style={[$loginContainer, {bottom: slideRange}]}>
        <Text size="xs">Sign in to continue</Text>
        <TouchableOpacity
          onPress={onPressGoogleLogin}
          activeOpacity={0.5}
          style={socialButton}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Image
              source={GoogleLogo}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
          )}
          <Text size="md" weight="semiBold">
            Continue with Google
          </Text>
        </TouchableOpacity>
        {error && (
          <Text size="xs" weight="semiBold" style={{color: 'red'}}>
            {error}
          </Text>
        )}
        <Text size="xxs">
          By continuing, you agree to Health Hub's{' '}
          <Text size="xxs" style={{color: colors.primary}}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text size="xxs" style={{color: colors.primary}}>
            Privacy Policy.
          </Text>
        </Text>
      </Animated.View>
    </Screen>
  );
};

const $containerStyle: ViewStyle = {
  flex: 1,
  backgroundColor: colors.secondary,
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const $loginContainer: ViewStyle = {
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.extraSmall,
  backgroundColor: 'white',
  width: Dimensions.get('window').width,
  position: 'absolute',
  left: 0,
  right: 0,
  elevation: 10,
  paddingHorizontal: 20,
  paddingTop: spacing.small,
  paddingBottom: 80,
  shadowColor: 'black',
  shadowOffset: {width: -4, height: -4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
};

const socialButton: ViewStyle = {
  ...$flexRowCenterStyle,
  gap: spacing.small,
  width: '100%',
  borderWidth: 0.5,
  borderColor: 'rgba(0,0,0,0.4)',
  borderRadius: 20,
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.medium,
};

export default LoginScreen;

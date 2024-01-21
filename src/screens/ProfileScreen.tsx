import {Avatar, Icon, Image} from '@rneui/themed';
import React, {useContext} from 'react';
import {Alert, ImageStyle, Pressable, View, ViewStyle} from 'react-native';
import {AuthContext} from '../navigators/AuthContext';
import {
  $flexColumnCenterStyle,
  $flexRowCenterStyle,
  $flexRowStyle,
  colors,
  spacing,
} from '../theme';
import Divider from '../components/common/Divider';
import {Screen, Text} from '../components';

export const ProfileScreen: React.FC = () => {
  const {user, logout} = useContext(AuthContext);

  return (
    <Screen
      contentContainerStyle={{
        flex: 1,
        paddingTop: spacing.large,
      }}>
      <View style={[$flexColumnCenterStyle, {marginBottom: spacing.large}]}>
        <Image style={$profileImage} source={{uri: user?.photoURL || ''}} />
        <Text weight="semiBold" style={{marginTop: spacing.extraSmall}}>
          {user?.displayName}
        </Text>
        <Text size="xxs" style={{color: colors.textDim}}>
          {user?.email || user?.phoneNumber}
        </Text>
      </View>
      <Divider />
      <SetingListItem
        title="Account"
        onPress={() => console.log('AccountSettings')}
        icon="account"
      />
      <Divider />
      <SetingListItem
        title="Integration"
        onPress={() => console.log('IntegrationSettings')}
        icon="file-tree"
      />
      <Divider />
      <SetingListItem
        title="Preferences"
        onPress={() => console.log('Preferences')}
        icon="tune-vertical"
      />
      <Divider />
      <View style={$listItem}>
        <Text style={{textAlign: 'center'}} size="xxs">
          Version 1.0
        </Text>
      </View>
      <View style={$listItem} />
      <Divider />
      <SetingListItem
        icon="logout"
        title="Logout"
        onPress={() => {
          Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Logout',
              onPress: () => {
                logout();
              },
            },
          ]);
        }}
      />
      <Divider />
    </Screen>
  );
};

const SetingListItem: React.FC<{
  title: string;
  onPress: () => void;
  icon: string;
}> = ({title, onPress, icon}) => {
  return (
    <Pressable
      android_ripple={{color: colors.backgroundDim, borderless: false}}
      onPress={onPress}
      style={[$flexRowStyle, $listItem]}>
      <View style={$flexRowCenterStyle}>
        <Icon
          color={colors.text}
          type="material-community"
          name={icon}
          size={24}
        />
        <Text style={{marginLeft: spacing.small}}>{title}</Text>
      </View>
      <Icon
        color={colors.text}
        type="material-community"
        name="chevron-right"
        size={22}
      />
    </Pressable>
  );
};

const $listItem: ViewStyle = {
  paddingVertical: spacing.small + spacing.tiny,
  paddingHorizontal: spacing.medium,
};

const $profileImage: ImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 50,
};

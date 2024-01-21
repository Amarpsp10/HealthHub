import {PermissionsAndroid, View, ViewStyle} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Geolocation from '@react-native-community/geolocation';
import {Screen, Text} from '../components';
import {$flexColumnStyle, colors, spacing} from '../theme';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {AuthContext} from '../navigators/AuthContext';
import {useStores} from '../store';

export const HomeScreen = observer(() => {
  const {user} = useContext(AuthContext);
  const {
    locationStore: {
      isFetchingHospitals,
      hospitalsCount,
      hospitals,
      fetchNearbyHospitals,
    },
  } = useStores();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        'android.permission.ACCESS_FINE_LOCATION',
        {
          title: 'Location Access Required',
          message:
            'This App needs to Access your location to fetch near by hospitals',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(info => {
          if (info) {
            setCurrentLocation({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            });
            fetchNearbyHospitals(info.coords.latitude, info.coords.longitude);
          }
        });
      }
    });
  };

  return (
    <Screen>
      <View style={$header}>
        <View style={[$flexColumnStyle, {gap: spacing.tiny}]}>
          <Text size="md" weight="semiBold" style={{color: colors.background}}>
            Hey, {user?.displayName}
          </Text>
          <Text size="sm" weight="semiBold" style={{color: colors.background}}>
            {isFetchingHospitals
              ? 'Fetching near by hospitals...'
              : `${hospitalsCount} Hospitals found`}
          </Text>
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={$map}
        region={{
          latitude: currentLocation?.latitude || 37.78825,
          longitude: currentLocation?.longitude || -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {hospitals.map(hospital => (
          <Marker
            key={hospital.id}
            coordinate={{
              latitude: hospital.latitude,
              longitude: hospital.longitude,
            }}
            title={hospital.name}
            description={hospital.address}
          />
        ))}
      </MapView>
    </Screen>
  );
});

const $header: ViewStyle = {
  flexDirection: 'column',
  padding: spacing.medium,
  backgroundColor: colors.secondary,
  elevation: 10,
  zIndex: 10,
};

const $map: ViewStyle = {
  flex: 1,
};

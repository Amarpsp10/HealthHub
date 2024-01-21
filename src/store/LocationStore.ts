import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {withSetPropAction} from './helpers/withSetPropAction';
import {getNearbyHospitals} from '../APIs/getNearbyHospitals';
import {ToastAndroid} from 'react-native';

export const HospitalModel = types.model('Hospital', {
  id: types.identifier,
  name: types.string,
  address: types.string,
  latitude: types.number,
  longitude: types.number,
  rating: types.optional(types.number, 0),
});

export const LocationStoreModel = types
  .model('LocationStore')
  .props({
    isFetchingHospitals: types.optional(types.boolean, false),
    hospitals: types.array(HospitalModel),
  })
  .views(store => ({
    get hospitalsCount() {
      return store.hospitals.length;
    },
  }))
  .actions(withSetPropAction)
  .actions(store => ({
    fetchNearbyHospitals: async (latitude: number, longitude: number) => {
      store.setProp('isFetchingHospitals', true);
      const hospitalsData = await getNearbyHospitals(latitude, longitude);
      if (hospitalsData) {
        const hospitals = hospitalsData.map(location => ({
          id: location.place_id,
          name: location.name,
          address: location.vicinity,
          latitude: location.geometry.location.lat,
          longitude: location.geometry.location.lng,
          rating: location.rating,
        }));
        store.setProp('hospitals', hospitals);
        ToastAndroid.show(
          `Found ${hospitals.length} hospitals`,
          ToastAndroid.SHORT,
        );
      }
      store.setProp('isFetchingHospitals', false);
    },
  }));

export type LocationStore = Instance<typeof LocationStoreModel>;
export type LocationStoreSnapshot = SnapshotOut<typeof LocationStoreModel>;

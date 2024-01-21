import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {LocationStoreModel} from './LocationStore';

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    locationStore: types.optional(LocationStoreModel, {}),
  })
  .actions(self => ({
    reset() {
      self.locationStore = LocationStoreModel.create({});
    },
  }));

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>;
/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;

export const RootStore = RootStoreModel.create({});

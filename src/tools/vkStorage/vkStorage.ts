import { Storage, VKStorageMethods } from 'src/lib/storage';
import { vkStorageInitialState, VKStorageState } from './types';
import { VKBridge } from '@vkontakte/vk-bridge';

export type VKStorage = Storage<VKStorageState>;

export const initVKStorage = (bridge: VKBridge): VKStorage =>
  new Storage({
    methods: new VKStorageMethods(bridge),
    initialState: vkStorageInitialState,
  });

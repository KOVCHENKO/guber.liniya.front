import IInterfaceState from '@/store/util/interface/types';
import {Module} from 'vuex';
import RootState from '@/store/types';

export const state: IInterfaceState = {
    loading: false,
};

export const interstate: Module<IInterfaceState, RootState> = {
    state,
};

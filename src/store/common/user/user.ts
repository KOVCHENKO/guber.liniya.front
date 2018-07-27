import {Module} from 'vuex';
import UserState from '@/store/common/user/types';
import User from '@/domain/entities/common/User';
import RootState from '@/store/types';

export const state: UserState = {
    user: new User(0, '', ''),
};


export const user: Module<UserState, RootState> = {
    state,
};

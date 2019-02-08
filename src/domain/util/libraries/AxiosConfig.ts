import axios from 'axios';
import UserState from '@/store/common/user/types';

export const addAuthorizationHeader = (userState: UserState) => {
    // noinspection TsLint
    axios.defaults.headers.common.Authorization = userState.token;
};

export const addAuthorizationHeaderFromLocalStorage = (storage: any) => {
    const token = JSON.parse(storage).user.token;
    // noinspection TsLint
    if (token) {
        axios.defaults.headers.common.Authorization = token;
    }
};


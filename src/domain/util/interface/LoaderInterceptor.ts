import axios from 'axios';
import {state} from '@/store/util/interface/interface';

export const loaderInitializer = () => {
    axios.interceptors.request.use((config) => {

        state.loading = true;

        // Do something before request is sent
        return config;
    }, (error) => {

        state.loading = false;
        // Do something with request error
        return Promise.reject(error);
    });

// Add a response interceptor
    axios.interceptors.response.use((response) => {

        state.loading = false;

        // Do something with response data
        return response;
    }, (error) => {

        state.loading = false;
        // Do something with response error
        return Promise.reject(error);
    });

};


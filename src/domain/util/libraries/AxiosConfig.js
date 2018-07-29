import axios from 'axios';
export const addAuthorizationHeader = (userState) => {
    // noinspection TsLint
    axios.defaults.headers.common['Authorization'] = userState.token;
};
//# sourceMappingURL=AxiosConfig.js.map
export const tokenCheck = () => {
    if (localStorage.getItem('vuex')) {
        const vuexStorage = localStorage.getItem('vuex');
        return JSON.parse(vuexStorage).user.token;
    }
};
//# sourceMappingURL=CheckTokenAvailability.js.map
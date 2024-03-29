export const ADMIN = 'admin';
export const DISPATCHER = 'dispatcher';
export const ANALYST = 'analyst';
export const SPECIALIST = 'specialist';
export const COMMUNICATOR = 'communicator';
export const SUPERVISOR = 'supervisor';
export const EDITOR = 'editor';
export const getRole = () => {
    if (localStorage.getItem('vuex')) {
        const vuexStorage = localStorage.getItem('vuex');
        return JSON.parse(vuexStorage).user.role.name;
    }
};
//# sourceMappingURL=RoleChecker.js.map
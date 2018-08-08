import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/common/Login.vue';
import Desktop from './views/common/Desktop.vue';
import Menu from './views/common/Menu.vue';
import Analytics from './views/functional/analytics/Analytics.vue';
import CommunicatorApplications from './views/functional/applications/CommunicatorApplications.vue';
import DispatcherApplications from './views/functional/applications/DispatcherApplications.vue';
import SpecialistApplications from './views/functional/applications/SpecialistApplications.vue';
import AllOrganizations from './views/functional/organizations/AllOrganizations.vue';
import SpecialistOrganizations from './views/functional/organizations/SpecialistOrganizations.vue';
import AllProblemTypes from './views/functional/problems/AllProblemTypes.vue';
import SingleProblemType from './views/functional/problems/SingleProblemType.vue';
import SingleOrganization from './views/functional/organizations/SingleOrganization.vue';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/', name: 'login', component: Login,
        },
        {
            path: '/desktop',
            name: 'desktop',
            component: Desktop,
            children: [
                {
                    path: '/menu', name: 'menu',
                    component: Menu,
                },
                {
                    path: '/analytics', name: 'analytics',
                    component: Analytics,
                },
                {
                    path: '/communicator_applications', name: 'communicator_applications',
                    component: CommunicatorApplications,
                },
                {
                    path: '/dispatcher_applications', name: 'dispatcher_applications',
                    component: DispatcherApplications,
                },
                {
                    path: '/specialist_applications', name: 'specialist_applications',
                    component: SpecialistApplications,
                },
                {
                    path: '/all_organizations', name: 'all_organizations',
                    component: AllOrganizations,
                },
                {
                    path: '/specialist_organizations', name: 'specialist_organizations',
                    component: SpecialistOrganizations,
                },
                {
                    path: '/all_problems', name: 'all_problems',
                    component: AllProblemTypes,
                },
                {
                    path: '/single_problem/:id', name: 'single_problem',
                    component: SingleProblemType,
                },
                {
                    path: '/single_organization/:id', name: 'single_organization',
                    component: SingleOrganization,
                },
            ],
        },
    ],
});
//# sourceMappingURL=router.js.map
import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/common/Login.vue';
import Desktop from './views/common/Desktop.vue';
import Analytics from './views/functional/analytics/Analytics.vue';
import CommunicatorApplications from './views/functional/applications/CommunicatorApplications.vue';
import DispatcherApplications from './views/functional/applications/DispatcherApplications.vue';
import SpecialistApplications from './views/functional/applications/SpecialistApplications.vue';
import AllOrganizations from './views/functional/organizations/AllOrganizations.vue';
import SpecialistOrganizations from './views/functional/organizations/SpecialistOrganizations.vue';
import AllProblemTypes from './views/functional/problems/AllProblemTypes.vue';
import AllRoles from './views/functional/roles/AllRoles/AllRoles.vue';
import SingleProblemType from './views/functional/problems/SingleProblemType.vue';
import SingleOrganizationProblems from './views/functional/organizations/SingleOrganizationProblems.vue';
import SingleOrganizationUsers from './views/functional/organizations/SingleOrganizationUsers.vue';
import Calls from './views/functional/calls/Calls.vue';
import { authMiddleware, roleMiddleware } from '@/domain/util/authorization/RouterMiddleware';
import { ADMIN, ANALYST, COMMUNICATOR, SPECIALIST, } from '@/domain/util/authorization/RoleChecker';
Vue.use(Router);
const router = new Router({
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
                    path: '/analytics', name: 'analytics',
                    component: Analytics,
                    meta: { requiresAuth: true, ANALYST },
                },
                {
                    path: '/communicator_applications', name: 'communicator_applications',
                    component: CommunicatorApplications,
                    meta: { requiresAuth: true, requiresRole: COMMUNICATOR },
                },
                {
                    // TODO: прикрепить авторизацию к данному маршруту
                    path: '/dispatcher_applications/:dispatch_status', name: 'dispatcher_applications',
                    component: DispatcherApplications,
                    meta: { requiresAuth: true },
                },
                {
                    path: '/specialist_applications', name: 'specialist_applications',
                    component: SpecialistApplications,
                    meta: { requiresAuth: true, requiresRole: SPECIALIST },
                },
                {
                    path: '/all_organizations', name: 'all_organizations',
                    component: AllOrganizations,
                    meta: { requiresAuth: true, requiresRole: ADMIN },
                },
                {
                    path: '/specialist_organizations', name: 'specialist_organizations',
                    component: SpecialistOrganizations,
                    meta: { requiresAuth: true, requiresRole: SPECIALIST },
                },
                {
                    path: '/all_problems', name: 'all_problems',
                    component: AllProblemTypes,
                    meta: { requiresAuth: true, requiresRole: ADMIN },
                },
                {
                    path: '/all_roles', name: 'all_roles',
                    component: AllRoles,
                },
                {
                    path: '/single_problem/:id', name: 'single_problem',
                    component: SingleProblemType,
                    meta: { requiresAuth: true, requiresRole: ADMIN },
                },
                {
                    path: '/single_organization_problems/:id', name: 'single_organization_problems',
                    component: SingleOrganizationProblems,
                    meta: { requiresAuth: true, requiresRole: ADMIN },
                },
                {
                    path: '/single_organization_users/:id', name: 'single_organization_users',
                    component: SingleOrganizationUsers,
                    meta: { requiresAuth: true, requiresRole: ADMIN },
                },
                {
                    // TODO: прикрепить авторизацию к данному маршруту
                    path: '/calls', name: 'calls',
                    component: Calls,
                    meta: { requiresAuth: true },
                },
            ],
        },
    ],
});
authMiddleware(router);
roleMiddleware(router);
export default router;
//# sourceMappingURL=router.js.map
import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/common/Login.vue';
import Desktop from './views/common/Desktop.vue';
import Analytics from './views/functional/analytics/Analytics.vue';
import CommunicatorApplications from './views/functional/applications/CommunicatorApplications.vue';
import DispatcherApplications from './views/functional/applications/DispatcherApplications.vue';
import SpecialistApplications from './views/functional/applications/specialist/SpecialistApplications.vue';
import ClaimsOfChildrenOrganizations from './views/functional/applications/specialist/ClaimsOfChildrenOrganizations.vue';
import AllOrganizations from './views/functional/organizations/AllOrganizations.vue';
import SpecialistOrganizations from './views/functional/organizations/SpecialistOrganizations.vue';
import AllProblemTypes from './views/functional/problems/AllProblemTypes.vue';
import AllRoles from './views/functional/roles/AllRoles/AllRoles.vue';
import SingleProblemType from './views/functional/problems/SingleProblemType.vue';
import SingleOrganizationProblems from './views/functional/organizations/SingleOrganizationProblems.vue';
import SingleOrganizationUsers from './views/functional/organizations/SingleOrganizationUsers.vue';
import Calls from './views/functional/calls/Calls.vue';
import AnsweredCalls from './views/functional/calls/Answered.vue';
import MissedCalls from './views/functional/calls/Missed.vue';

import DispatcherClaims from './views/functional/applications/dispatcher/DispatcherClaims.vue';
import PreparedDispatcherClaims from './views/functional/applications/dispatcher/Prepared.vue';
import DeclinedDispatcherClaims from './views/functional/applications/dispatcher/Declined.vue';

import SupervisorClaims from '@/views/functional/applications/supervisor/SupervisorClaims.vue';
import PreparedSupervisorClaims from './views/functional/applications/supervisor/Prepared.vue';
import EditableSupervisorClaims from './views/functional/applications/supervisor/Editable.vue';
import ExecutableSupervisorClaims from './views/functional/applications/supervisor/Executable.vue';
import DeclinedSupervisorClaims from './views/functional/applications/supervisor/Declined.vue';

import SpecialistCreatedClaims from './views/functional/applications/specialist/CreatedClaims.vue';
import SpecialistAssignedClaims from './views/functional/applications/specialist/AssignedClaims.vue';
import SpecialistExecutedClaims from './views/functional/applications/specialist/ExecutedClaims.vue';
import SpecialistClosedClaims from './views/functional/applications/specialist/ClosedClaims.vue';
import SpecialistSubcontractorsClaims from './views/functional/applications/specialist/SubcontractorsClaims.vue';

import {authMiddleware, roleMiddleware} from '@/domain/util/authorization/RouterMiddleware';
import {
    ADMIN,
    ANALYST,
    COMMUNICATOR,
    DISPATCHER,
    EDITOR,
    SPECIALIST,
    SUPERVISOR,
} from '@/domain/util/authorization/RoleChecker';

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
            // {
                // TODO: прикрепить авторизацию к данному маршруту
                // path: '/dispatcher_applications/:dispatch_status', name: 'dispatcher_applications',
                // component: DispatcherApplications,
                // meta: { requiresAuth: true },
            // },
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
                path: '/claims_of_children_organizations', name: 'claims_of_children_organizations',
                component: ClaimsOfChildrenOrganizations,
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
                // meta: { requiresAuth: true, requiresRole: ADMIN },
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
                children: [
                    {
                        path: '/answered_calls', name: 'answered_calls',
                        component: AnsweredCalls,
                    },
                    {
                        path: '/missed_calls', name: 'missed_calls',
                        component: MissedCalls,
                    },
                ],
            },
            {
                path: '/dispatcher_applications/', name: 'dispatcher_applications',
                component: DispatcherClaims,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: '/declined_dispatcher_claims', name: 'declined_dispatcher_claims',
                        component: DeclinedDispatcherClaims,
                    },
                    {
                        path: '/prepared_dispatcher_claims', name: 'prepared_dispatcher_claims',
                        component: PreparedDispatcherClaims,
                    },
                ],
            },
            {
                path: '/supervisor_applications/', name: 'supervisor_applications',
                component: SupervisorClaims,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: '/prepared_supervisor_claims', name: 'prepared_supervisor_claims',
                        component: PreparedSupervisorClaims,
                    },
                    {
                        path: '/executable_supervisor_claims', name: 'executable_supervisor_claims',
                        component: ExecutableSupervisorClaims,
                    },
                    {
                        path: '/editable_supervisor_claims', name: 'editable_supervisor_claims',
                        component: EditableSupervisorClaims,
                    },
                    {
                        path: '/declined_supervisor_claims', name: 'declined_supervisor_claims',
                        component: DeclinedSupervisorClaims,
                    },
                ],
            },
            {
                path: '/specialist_applications', name: 'specialist_applications',
                component: SpecialistApplications,
                meta: { requiresAuth: true, requiresRole: SPECIALIST},
                children: [
                    {
                        path: '/specialist_created_claims', name: 'specialist_created_claims',
                        component: SpecialistCreatedClaims,
                        meta: {requiresRole: SPECIALIST},
                    },
                    {
                        path: '/specialist_assigned_claims', name: 'specialist_assigned_claims',
                        component: SpecialistAssignedClaims,
                        meta: {requiresRole: SPECIALIST},
                    },
                    {
                        path: '/specialist_executed_claims', name: 'specialist_executed_claims',
                        component: SpecialistExecutedClaims,
                        meta: {requiresRole: SPECIALIST},
                    },
                    {
                        path: '/specialist_closed_claims', name: 'specialist_closed_claims',
                        component: SpecialistClosedClaims,
                        meta: {requiresRole: SPECIALIST},
                    },
                    {
                        path: '/specialist_subcontractors_claims', name: 'specialist_subcontractors_claims',
                        component: SpecialistSubcontractorsClaims,
                        meta: {requiresRole: SPECIALIST},
                    },
                ],
            },
        ],
    },
  ],
});

authMiddleware(router);
roleMiddleware(router);

export default router;

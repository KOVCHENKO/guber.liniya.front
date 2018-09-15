<!--suppress TypeScriptUnresolvedVariable -->
<template>
    <div>
        
        <div class="main-page">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th colspan="4">
                            <input v-model="searchField" @input="throttledSearch" class="form-control" placeholder="Поиск по дате, заявителю, телефону">
                        </th>
                        <th colspan="4">
                            <select class="form-control" id="inputGroupSelect01">
                                <option selected>Статус заявки</option>
                                <option value="1">Отред</option>
                                <option value="2">Отпр</option>
                                <option value="3">Созд</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" v-for="(column, index) in tableColumns" :key="index">{{column.label}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(claim, index) in claims" :key="index">
                        <th>{{claim.created_at}}</th>
                        <td>{{claim.firstname}} {{claim.middlename}} {{claim.lastname}}</td>
                        <td>{{claim.phone}}</td>
                        <td>{{ claim.address.district }} / {{ claim.address.location }}</td>
                        <td>{{ claim.dispatch_status }}</td>
                        <td style="color:red" v-if="claim.status === 'Отказано'" @click="reassignToAnotherOrganization(claim)">{{ claim.status }}</td>
                        <td v-if="claim.status !== 'Отказано'">{{ claim.status }}</td>
                        <td >{{ claim.close_status }}</td>
                        <td>
                            <div style="cursor: pointer;" @click="show(claim)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <datatable-custom-paginator
                    v-on:setAnotherPage="getAllClaims({ dispatchStatus: $route.params.dispatch_status })"
            ></datatable-custom-paginator>

        </div>

        <update-application></update-application>
        <reassign-to-another-organization></reassign-to-another-organization>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import DatatableCustomPaginator from '../../../components/util/DatatableCustomPaginator.vue';
    import UpdateApplication from '@/components/functional/applications/DispatcherApplications/UpdateApplication.vue';
    import ReassignToAnotherOrganization from '@/components/functional/applications/DispatcherApplications/ReassignToAnotherOrganization.vue';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../store/functional/claim/types';
    import {headings, plusButton, statusDialog} from '../../../domain/util/interface/CommonInterface';
    import Claim from '../../../domain/entities/functional/Claim';
    import Address from '../../../domain/entities/functional/Address';
    import Problem from '../../../domain/entities/functional/Problem';
    import throttle from '../../../store/util/operations/throttle';
    import IWithRoute from '../../../domain/util/interface/IWithRoute';
    import Call from '../../../domain/entities/functional/Call';
    import ClaimService from '../../../domain/services/functional/claims/ClaimService';

    @Component({
        components: {
            DatatableCustomized,
            UpdateApplication,
            DatatableCustomPaginator,
            ReassignToAnotherOrganization,
        },
    })
    export default class DispatcherApplications extends Vue implements IWithRoute {
        @Provide()
        public searchField: string = '';

        @Provide()
        public tableColumns = [
            {label: 'Дата'},
            {label: 'Заявитель'},
            {label: 'Телефон'},
            {label: 'Адрес (район / адрес)'},
            {label: 'Статус обработки'},
            {label: 'Статус выполнения'},
            {label: 'Статус закрытия'},
            {label: ''},
        ];

        @State('claim')
        public claimState!: ClaimState;

        @Action public getAllClaims;
        @Action public searchClaim;

        constructor() {
            super();
            headings.title = 'Все заявки';
            plusButton.visible = false;
            plusButton.title = 'Добавить заявку';
        }

        public created() {
            this.getAllClaims({ dispatchStatus: this.$route.params.dispatch_status });
        }

        public show(claim) {
            this.makeClaim(claim);
            statusDialog.show = true;
        }

        public makeClaim(claim) {
            let problem = new Problem(0, '', '');

            if (claim.problem !== null) {
                problem = new Problem(claim.problem.id, claim.problem.description, claim.problem.description);
            }

            this.claimState.claim = new Claim(claim.id, 'no_name', claim.description, claim.firstname,
                claim.middlename, claim.lastname, claim.phone, claim.email, claim.link, claim.status,
                claim.dispatch_status, null, claim.parents, claim.comments,
                new Address(claim.address.id, claim.address.district, claim.address.location), problem,
                new Call(0, '', '', '', 'success', 'in',  '', '', ''));

            // Подтверждающие файлы
            this.claimState.confirmationFiles = claim.files;
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

        /**
         * Обработка статусов: статус отправки, статус выполнения, статус закрытия
         * @returns {IClaim[]}
         */
        get claims() {
            this.claimState.claims = ClaimService.resolveClaimDispatchStatus(this.claimState.claims);
            this.claimState.claims = ClaimService.resolveClaimStatus(this.claimState.claims);

            return this.claimState.claims;
        }

        public startSearch() {
            if (this.searchField === '') {
                this.getAllClaims({ dispatchStatus: this.$route.params.dispatch_status });
                return;
            }
            this.searchClaim({search: this.searchField, dispatchStatus: this.$route.params.dispatch_status });
        }

        /**
         * Переназначить другой организации
         */
        public reassignToAnotherOrganization(claim) {
            this.makeClaim(claim);
            $('#reassignToAnotherOrganization').modal('show');
        }
    }
</script>

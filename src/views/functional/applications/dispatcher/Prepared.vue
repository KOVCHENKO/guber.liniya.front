<template>
    <div class="tab-pane fade show active" id="current" role="tabpanel" aria-labelledby="current-tab">
        <div class="main-page">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th colspan="4">
                        <input v-model="searchField" @input="throttledSearch" class="form-control input-search" placeholder="Поиск по заявителю, телефону">
                    </th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">
                        {{column.label}}
                        <i v-if="column.sorting" class="fas fa-sort" @click="makeSorting(column.column)"></i>
                    </th>
                </tr>
                </thead>
                <tbody>
                <!-- <span> -->
                <tr :class="[{ expiredClaim: claim.expired }]" class="dispatch-status-background" v-for="(claim, index) in claims" :key="index">
                    <th>{{ claim.created_at_shortened }}</th>
                    <td>{{ claim.firstname }} {{ claim.middlename }} {{ claim.lastname }}</td>
                    <td>{{ claim.phone }}</td>
                    <td>{{ claim.address.district }} / {{ claim.address.location }}</td>
                    <td>
                        <div style="cursor: pointer;" @click="show(claim)">
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                    </td>
                    <td v-if="claim.responsible_organization === ''">Информация отсутсвует</td>
                    <td v-else>{{ claim.responsible_organization[0].name }}</td>
                </tr>
                <!-- </span> -->
                </tbody>
            </table>

            <datatable-custom-paginator
                    v-on:setAnotherPage="getAllClaims({
                        dispatchStatus: $route.params.dispatch_status,
                        dispatchStatusFilter: dispatchStatusFilter,
                        statusFilter: statusFilter,
                        closeStatusFilter: closeStatusFilter,
                     })"
            ></datatable-custom-paginator>

        </div>

        <update-application></update-application>
        <reassign-to-another-organization></reassign-to-another-organization>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '@/components/util/DatatableCustomized.vue';
    import DatatableCustomPaginator from '@/components/util/DatatableCustomPaginator.vue';
    import UpdateApplication from '@/views/functional/applications/dispatcher/partials/UpdateApplication.vue';
    import ReassignToAnotherOrganization from '@/components/functional/applications/DispatcherApplications/ReassignToAnotherOrganization.vue';
    import {Action, State} from 'vuex-class';
    import ClaimState from '@/store/functional/claim/types';
    import {headings, plusButton} from '@/domain/util/interface/CommonInterface';
    import Problem from '@/domain/entities/functional/Problem';
    import throttle from '@/store/util/operations/throttle';
    import IWithRoute from '@/domain/util/interface/IWithRoute';
    import ClaimService from '@/domain/services/functional/claims/ClaimService';
    import IPaginationState from '@/store/util/pagination/types';
    import {PREPARED} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
    import {Echo} from "@/bootstrap";
    // import {Echo} from '@/bootstrap';

    @Component({
        components: {
            DatatableCustomized,
            UpdateApplication,
            DatatableCustomPaginator,
            ReassignToAnotherOrganization,
        },
        sockets:{
            connect(){
                console.log('connect was called');
            },
            disconnect(){
                console.log('disconnect was called');
            }
        }
    })
    export default class PreparedClaims extends Vue implements IWithRoute {
        // Фильтры - Поиск, Статус приема, Статус обработки, Статус выполнения
        @Provide() public searchField: string = '';
        @Provide() public dispatchStatusFilter: string = PREPARED;
        @Provide() public statusFilter: string = 'all';
        @Provide() public closeStatusFilter: string = 'all';

        // Поле сортировки
        public sortBy: string = 'created_at';
        public sortDirection: string = 'desc';

        @Provide()
        public tableColumns = [
            { label: 'Дата', sorting: true, column: 'created_at' },
            { label: 'Заявитель', sorting: true, column: 'lastname' },
            { label: 'Телефон', sorting: true, column: 'phone' },
            { label: 'Адрес (район / адрес)', sorting: false, column: 'address' },
            { label: '', sorting: false, column: '' },
            { label: 'Организация', sorting: false, column: 'responsible_organizations' },
        ];

        @State('claim') public claimState!: ClaimState;
        @State('pagination') public paginationState!: IPaginationState;


        @Action public getAllClaims;
        @Action public searchClaim;

        constructor() {
            super();
            headings.title = 'Все заявки';
            plusButton.visible = false;
            plusButton.title = 'Добавить заявку';
        }

        public created() {
            this.listenToLaravelEcho();

            this.getAllClaims({
                dispatchStatus: this.$route.params.dispatch_status,
                dispatchStatusFilter: this.dispatchStatusFilter,
            });
        }

        public show(claim) {
            this.makeClaim(claim);
            $('#updateApplication').modal('show');
        }

        public makeClaim(claim) {
            let problem = new Problem(0, '', '');

            if (claim.problem !== null) {
                problem = new Problem(claim.problem.id, claim.problem.description, claim.problem.description);
            }

            this.claimState.claim = claim;

            // Подтверждающие файлы
            this.claimState.confirmationFiles = claim.files;

            // Ответственные организации
            this.claimState.responsibleOrganizations = claim.responsible_organization;
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
            this.claimState.claims = ClaimService.addTranslatedClaimStatus(this.claimState.claims);
            this.claimState.claims = ClaimService.addTranslatedCloseStatus(this.claimState.claims);
            this.claimState.claims = ClaimService.changeTimeFormat(this.claimState.claims);

            return this.claimState.claims;
        }

        public startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;

            // Начать поиск
            if (this.searchField === '') {
                this.getAllClaims({
                    dispatchStatus: this.$route.params.dispatch_status,
                    dispatchStatusFilter: PREPARED,
                    statusFilter: this.statusFilter,
                    closeStatusFilter: this.closeStatusFilter,
                    sortBy: this.sortBy,
                    sortDirection: this.sortDirection,
                });
                return;
            }

            this.searchClaim({
                search: this.searchField,
                dispatchStatus: this.$route.params.dispatch_status,
                dispatchStatusFilter: PREPARED,
                statusFilter: this.statusFilter,
                closeStatusFilter: this.closeStatusFilter,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection,
            });
        }

        /**
         * Переназначить другой организации
         */
        public reassignToAnotherOrganization(claim) {
            this.makeClaim(claim);
            $('#reassignToAnotherOrganization').modal('show');
        }

        /**
         * Сортировка
         * @param columnName
         */
        public makeSorting(columnName) {
            this.sortDirection === 'desc' ? this.sortDirection = 'asc' : this.sortDirection = 'desc';
            this.sortBy = columnName;
            this.startSearch();
        }

        /**
         * Слушаем события на создание
         */
        public listenToLaravelEcho() {

            Echo.channel('new-claim-channel').listen('NewClaimEvent', (e) => {
                console.log('new claim event has been called');
            });
        }
    }

</script>

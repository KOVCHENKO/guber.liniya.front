<template>
    <div class="tab-pane fade show active" id="current" role="tabpanel" aria-labelledby="current-tab">
        <div class="main-page">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}}
                        <span v-if="column.hasOwnProperty('filter')">
                                <span><i class="fas fa-filter container-icon" @click="useFilter(column)"></i></span>
                                <base-filter :column="column">
                                    <component v-bind:is="column.component" :dataFilter="dataFilter"></component>
                                </base-filter>
                            </span>
                        <span v-if="column.hasOwnProperty('sort')" @click="sortClaims(column)">
                                <i class="fas cst-sort" @mouseenter="column.hover = !(column.sort) ? 'fa-sort-up' : ''" @mouseleave="column.hover=''"
                                   v-bind:class="[ column.hover, { 'fa-sort-up' : (column.sort === 'asc'), 'fa-sort-down': (column.sort === 'desc') }]"></i>
                            </span>
                        <span v-if="column.hasOwnProperty('icon')"><i v-bind:class="[column.icon]"></i></span>
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
                        dispatchStatus: dispatchStatusFilter,
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
    import BaseFilter from '@/components/base/BaseFilter.vue';
    import SearchField from '@/components/base/filters/SearchField.vue';
    import DateField from '@/components/base/filters/DateField.vue';


    @Component({
        components: {
            DatatableCustomized,
            UpdateApplication,
            DatatableCustomPaginator,
            ReassignToAnotherOrganization,
            BaseFilter,
        },
    })
    export default class PreparedClaims extends Vue implements IWithRoute {
        // Фильтры - Поиск, Статус приема, Статус обработки, Статус выполнения
        @Provide() public searchField: string = '';
        @Provide() public dispatchStatusFilter: string = PREPARED;

        // Поле сортировки
        public sortBy: string = 'created_at';
        public sortDirection: string = 'desc';

        @Provide()
        public tableColumns = [
            { label: 'Дата', sorting: true, column: 'created_at', filter: false, component: DateField },
            { label: 'Заявитель', sorting: true, column: 'lastname', filter: false, component: SearchField },
            { label: 'Телефон', sorting: true, column: 'phone', filter: false, component: SearchField },
            { label: 'Адрес (район / адрес)', sorting: false, filter: false, column: 'address', component: SearchField },
            { label: '', sorting: false, column: '', filter: false, component: SearchField },
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
            this.getAllClaims({
                dispatchStatus: PREPARED,
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

        // TODO: dataFilter
        get dataFilter() {
            return;
        }

        public startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;

            // Начать поиск
            if (this.searchField === '') {
                this.getAllClaims({
                    dispatchStatus: PREPARED,
                    sortBy: this.sortBy,
                    sortDirection: this.sortDirection,
                });
                return;
            }

            this.searchClaim({
                search: this.searchField,
                dispatchStatus: PREPARED,
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

        // TODO: filter
        public useFilter(row) {
            return;
        }
    }

</script>

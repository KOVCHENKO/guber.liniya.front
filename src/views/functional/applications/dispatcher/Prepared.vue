<template>
    <div class="tab-pane fade show active" id="current" role="tabpanel" aria-labelledby="current-tab">
        <br>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}}
                            <span v-if="column.hasOwnProperty('filter')">
                                    <span><i class="fas fa-filter container-icon" @click="useFilter(column)"></i></span>
                                    <base-filter :column="column">
                                        <component @search="assignDataFilter($event)" v-bind:is="column.component" :dataFilter.sync="column.dataFilter"></component>
                                    </base-filter>
                                </span>
                            <span v-if="column.hasOwnProperty('sort')" @click="sortClaims(column)">
                                    <i class="fas cst-sort" @mouseenter="column.hover = !(column.sort) ? 'fa-sort-up' : ''" @mouseleave="column.hover=''"
                                       v-bind:class="[ column.hover, { 'fa-sort-up' : (column.sort === 'asc'), 'fa-sort-down': (column.sort === 'desc') }]"></i>
                                </span>
                            <span v-if="column.hasOwnProperty('icon')">
                                <i v-bind:class="[column.icon]"></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                <!-- <span> -->
                <tr :class="[{ expiredClaim: claim.expired }]" class="dispatch-status-background" v-for="(claim, index) in claims" :key="index">
                    <th>{{ claim.created_at_shortened }}</th>
                    <td>{{ claim.applicant.lastname }} {{ claim.applicant.firstname }} {{ claim.applicant.middlename }}</td>
                    <td>{{ claim.phone }}</td>
                    <td>{{ claim.address.district }} / {{ claim.address.location }}</td>
                    <td>
                        <div style="cursor: pointer;" @click="show(claim)">
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                    </td>
                    <td v-if="claim.responsible_organization === ''">Информация отсутсвует</td>
                    <td v-else>{{ claim.responsibleOrganizationName }}</td>
                </tr>
                <!-- </span> -->
                </tbody>
            </table>

            <datatable-custom-paginator
                    v-on:setAnotherPage="getAllClaims({
                        dispatchStatus: dispatchStatusFilter,
                     })"
            ></datatable-custom-paginator>

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
    import IWithRoute from '@/domain/util/interface/IWithRoute';
    import ClaimService from '@/domain/services/functional/claims/ClaimService';
    import IPaginationState from '@/store/util/pagination/types';
    import {PREPARED} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
    import BaseFilter from '@/components/base/BaseFilter.vue';
    import SearchField from '@/components/base/filters/SearchField.vue';
    import DateField from '@/components/base/filters/DateField.vue';
    import {socket} from '@/bootstrap';

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
        @Provide() public dispatchStatusFilter: string = PREPARED;

        // Поле сортировки
        public sortBy: string = 'created_at';
        public sortDirection: string = 'desc';

        @Provide()
        private dataFilter = {
            date: {
                minDate: '',
                maxDate: '',
            },
            applicant: '',
            phone: '',
            address: '',
        };

        @Provide()
        private tableColumns = [
            { label: 'Дата', sorting: true, column: 'created_at', filter: false, component: DateField, dataFilter: 'date' },
            { label: 'Заявитель', sorting: true, column: 'lastname', filter: false, component: SearchField, dataFilter: 'applicant' },
            { label: 'Телефон', sorting: true, column: 'phone', filter: false, component: SearchField, dataFilter: 'phone' },
            { label: 'Адрес (район / адрес)', sorting: false, filter: false, column: 'address', component: SearchField, dataFilter: 'address' },
            { label: '', sorting: false, column: '' },
            { label: 'Организация', sorting: false, column: 'responsible_organizations' },
        ];


        @State('claim') private claimState!: ClaimState;
        @State('pagination') private paginationState!: IPaginationState;


        @Action private getAllClaims;
        @Action private searchClaim;

        constructor() {
            super();
            headings.title = 'Все заявки';
            plusButton.visible = false;
            plusButton.title = 'Добавить заявку';
        }

        private created() {
            // this.listenToEvents();

            this.getAllClaims({
                dispatchStatus: PREPARED,
            });
        }

        private show(claim) {
            this.makeClaim(claim);
            $('#updateApplication').modal('show');
        }

        private makeClaim(claim) {
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

        private startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;

            this.searchClaim({
                search: this.dataFilter,
                dispatchStatus: PREPARED,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection,
            });
        }

        /**
         * Переназначить другой организации
         */
        private reassignToAnotherOrganization(claim) {
            this.makeClaim(claim);
            $('#reassignToAnotherOrganization').modal('show');
        }

        /**
         * Сортировка
         * @param columnName
         */
        private makeSorting(columnName) {
            this.sortDirection === 'desc' ? this.sortDirection = 'asc' : this.sortDirection = 'desc';
            this.sortBy = columnName;
            this.startSearch();
        }

        /**
         * Отобразить фильтр для определенного столбца и скрыть остальные
         * @param row определенный столбец таблицы
         */
        private useFilter(row) {
            const filter = !row.filter;
            this.tableColumns.map((column) => {
                if (column.hasOwnProperty('filter')) {
                    column.filter = false;
                }
                return column;
            });
            row.filter = filter;
        }


        /**
         * 1. Применить определенный dataFilter на поле
         * 2. Начать поиск
         */
        private assignDataFilter(value: any) {
            this.dataFilter[value.field] = value.string;
            this.startSearch();
        }

        /**
         * Слушаем события на создание
         */
        private listenToEvents() {
            socket.on('new_claim', (data) => {
                // console.log(data);
            });
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
            this.claimState.claims = ClaimService.setExecutiveOrganization(this.claimState.claims);

            return this.claimState.claims;
        }
    }

</script>

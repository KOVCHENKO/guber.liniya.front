<template>
    <div>

        <div class="main-page">

            <table class="table table-hover">
                <thead>
                <tr>
                    <th colspan="5">
                        <input v-model="searchField" @input="throttledSearch" class="form-control input-search" placeholder="Поиск по дате, заявителю, телефону">
                    </th>
                    <th colspan="1" class="cst-col-213 cst-col-select">
                        <select class="form-control" id="inputGroupSelect01" v-model="closeStatusFilter" v-on:change="startSearch">
                            <option value="all">Статус закрытия</option>
                            <option value="not_executed">Ничего не сделано</option>
                            <option value="executed_partially">Выполнена частично</option>
                            <option value="executed_totally">Выполнена полностью</option>
                        </select>
                    </th>
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
                <tr :class="{ expiredClaim: claim.expired }" v-for="(claim, index) in claims" :key="index">
                    <th>{{claim.created_at_shortened}}</th>
                    <td v-if="claim.firstname === '' && claim.middlename === '' && claim.lastname === ''">Нет данных</td>
                    <td v-else>{{claim.firstname}} {{claim.middlename}} {{claim.lastname}}</td>
                    <td>{{claim.phone}}</td>
                    <td>{{ claim.address.district }} / {{ claim.address.location }}</td>
                    <td class="cst-col-213">{{ claim.translatedStatus }}</td>
                    <td class="cst-col-213">{{ claim.translatedCloseStatus }}</td>
                    <td v-if="claim.responsible_organization == ''">Информация отсутсвует</td>
                    <td v-else>{{ claim.responsible_organization[0].name }}</td>
                    <td>
                        <div style="cursor: pointer;" @click="show(claim)">
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <datatable-custom-paginator
                    v-on:setAnotherPage="getAllClaims({ statusFilter: 'aer' })"
            ></datatable-custom-paginator>

        </div>

        <close-claim></close-claim>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import DatatableCustomPaginator from '../../../components/util/DatatableCustomPaginator.vue';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../store/functional/claim/types';
    import {headings, plusButton, statusDialog} from '../../../domain/util/interface/CommonInterface';
    import Claim from '../../../domain/entities/functional/Claim';
    import Address from '../../../domain/entities/functional/Address';
    import Problem from '../../../domain/entities/functional/Problem';
    import IWithRoute from '../../../domain/util/interface/IWithRoute';
    import Call from '../../../domain/entities/functional/Call';
    import CloseClaim from '@/components/functional/applications/CommunicatorApplications/CloseClaim.vue';
    import ClaimService from '../../../domain/services/functional/claims/ClaimService';
    import throttle from '../../../store/util/operations/throttle';
    import IPaginationState from '../../../store/util/pagination/types';

    @Component({
        components: {
            DatatableCustomized,
            DatatableCustomPaginator,
            CloseClaim,
        },
    })
    export default class CommunicatorApplications extends Vue implements IWithRoute {
        @Provide() public searchField: string = '';
        @Provide() public closeStatusFilter: string = 'all';

        @Action public searchClaim;

        @Action public getAllClaims;

        // Поле сортировки
        public sortBy: string = 'created_at';
        public sortDirection: string = 'desc';

        @Provide()
        public tableColumns = [
            {label: 'Дата', sorting: true, column: 'created_at' },
            {label: 'Заявитель', sorting: true, column: 'lastname' },
            {label: 'Телефон', sorting: true, column: 'phone' },
            {label: 'Адрес (район / адрес)', sorting: false, column: 'address' },
            {label: 'Статус обработки', sorting: false, column: 'status'},
            {label: 'Статусы закрытия', sorting: false, column: 'close_status' },
            { label: 'Организация', sorting: false, column: 'responsible_organizations' },
            {label: '', sorting: false, column: '' },
        ];

        @State('claim') public claimState!: ClaimState;
        @State('pagination') public paginationState!: IPaginationState;

        constructor() {
            super();
            headings.title = 'Выполненные заявки';
            plusButton.visible = false;
        }

        public created() {
            this.getAllClaims({
                statusFilter: 'executed',
                dispatchStatusFilter: 'dispatched',
            });
        }

        public show(claim) {
            this.claimState.claim = new Claim(claim.id, 'no_name', claim.description, claim.firstname, claim.middlename,
                claim.lastname, claim.phone, claim.email, claim.link,
                claim.status, claim.dispatch_status, null, claim.level, claim.parents,
                claim.comments, new Address(claim.address.id, claim.address.district, claim.address.location),
                new Problem(claim.problem.id, claim.problem.description, claim.problem.description),
                new Call(0, '', '', '', 'success', 'in',  '', '', ''));

            this.claimState.responsibleOrganizations = claim.responsible_organization;

            statusDialog.show = true;
        }

        /**
         * Обработка статусов: статус закрытия
         * Изменение формата времени
         * @returns {IClaim[]}
         */
        get claims() {
            this.claimState.claims = ClaimService.addTranslatedCloseStatus(this.claimState.claims);
            this.claimState.claims = ClaimService.addTranslatedClaimStatus(this.claimState.claims);
            this.claimState.claims = ClaimService.changeTimeFormat(this.claimState.claims);

            return this.claimState.claims;
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }


        public startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;

            // Начать поиск
            if (this.searchField === '') {
                this.getAllClaims({
                    statusFilter: 'aer',
                    dispatchStatusFilter: 'dispatched',
                    closeStatusFilter: this.closeStatusFilter,
                    sortBy: this.sortBy,
                    sortDirection: this.sortDirection,
                });
                return;
            }

            this.searchClaim({
                search: this.searchField,
                statusFilter: 'aer',
                dispatchStatusFilter: 'dispatched',
                closeStatusFilter: this.closeStatusFilter,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection,
            });
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



    }
</script>

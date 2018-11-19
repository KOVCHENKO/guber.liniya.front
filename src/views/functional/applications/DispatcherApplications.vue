<!--suppress TypeScriptUnresolvedVariable -->
<template>
    <div>

        <div class="main-page">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th colspan="4">
                            <input v-model="searchField" @input="throttledSearch" class="form-control input-search" placeholder="Поиск по заявителю, телефону">
                        </th>
                        <th colspan="1" class="cst-col-190 cst-col-select">
                            <select class="form-control" id="inputGroupSelect01" v-model="dispatchStatusFilter" v-on:change="startSearch">
                                <option value="all">Статус приема</option>
                                <option value="raw">Необработанна</option>
                                <option value="edited">Отредактирована</option>
                                <option value="dispatched">Отправлена</option>
                                <option value="prepared">Создана</option>
                            </select>
                        </th>
                        <th colspan="1" class="cst-col-188 cst-col-select">
                            <select class="form-control" id="inputGroupSelect02" v-model="statusFilter" v-on:change="startSearch">
                                <option value="all">Статус обработки</option>
                                <option value="assigned">Назначена</option>
                                <option value="executed">Выполнена</option>
                                <option value="rejected">Отказано</option>
                            </select>
                        </th>
                        <th colspan="1" class="cst-col-213 cst-col-select">
                            <select class="form-control" id="inputGroupSelect03" v-model="closeStatusFilter" v-on:change="startSearch">
                                <option value="all">Статус закрытия</option>
                                <option value="not_executed">Ничего не сделано</option>
                                <option value="executed_partially">Выполнена частично</option>
                                <option value="executed_totally">Выполнена полностью</option>
                            </select>
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
                    <tr :class="[{ expiredClaim: claim.expired }, setClass(claim.dispatch_status)]" class="dispatch-status-background" v-for="(claim, index) in claims" :key="index">
                        <th>{{claim.created_at_shortened}}</th>
                        <td>{{claim.firstname}} {{claim.middlename}} {{claim.lastname}}</td>
                        <td>{{claim.phone}}</td>
                        <td>{{ claim.address.district }} / {{ claim.address.location }}</td>
                        <td class="cst-col-190">{{ claim.dispatch_status }}</td>
                        <td class="cst-col-188" style="color:red" v-if="claim.status === 'rejected'" @click="reassignToAnotherOrganization(claim)">{{ claim.translatedStatus }}</td>
                        <td class="cst-col-213" v-if="claim.status !== 'rejected'">{{ claim.translatedStatus }}</td>
                        <td >{{ claim.translatedCloseStatus }}</td>
                        <td>
                            <div style="cursor: pointer;" @click="show(claim)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                        <td >{{ claim.responsible_organization[0].name }}</td>
                    </tr>
                    <!-- </span> -->
                </tbody>
            </table>

            <datatable-custom-paginator
                    v-on:setAnotherPage="getAllClaims({ dispatchStatus: $route.params.dispatch_status, dispatchStatusFilter: dispatchStatusFilter  })"
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
        // Фильтры - Поиск, Статус приема, Статус обработки, Статус выполнения
        @Provide() public searchField: string = '';
        @Provide() public dispatchStatusFilter: string = 'all';
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
            { label: 'Статус приема', sorting: false, column: 'dispatch_status' },
            { label: 'Статус обработки', sorting: false, column: 'status' },
            { label: 'Статус выполнения', sorting: false, column: 'close_status' },
            { label: '', sorting: false, column: '' },
            { label: 'Организация', sorting: false, column: 'responsible_organizations' },
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
            this.getAllClaims({
                dispatchStatus: this.$route.params.dispatch_status,
                dispatchStatusFilter: this.dispatchStatusFilter,
            });
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
                claim.dispatch_status, null, claim.level, claim.parents, claim.comments,
                new Address(claim.address.id, claim.address.district, claim.address.location), problem,
                new Call(0, '', '', '', 'success', 'in',  '', '', ''));

            // Подтверждающие файлы
            this.claimState.confirmationFiles = claim.files;
        }

        public setClass(dispatchStatus) {
            if (dispatchStatus === 'Необработанна') {
                return 'dis-status-yellow-background';
            } else if (dispatchStatus === 'Отредактирована') {
                return 'dis-status-gray-background';
            } else if (dispatchStatus === 'Отправлена') {
                return 'dis-status-green-background';
            } else if (dispatchStatus === 'Создана') {
                return 'dis-status-red-background';
            }
            return '';
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
            if (this.searchField === '') {
                this.getAllClaims({
                    dispatchStatus: this.$route.params.dispatch_status,
                    dispatchStatusFilter: this.dispatchStatusFilter,
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
                dispatchStatusFilter: this.dispatchStatusFilter,
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
    }
</script>

<style>
    .expiredClaim {
        color: red;
    }
</style>

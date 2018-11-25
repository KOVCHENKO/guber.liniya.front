<template>
    <div>

        <div class="main-page">

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th colspan="4">
                            <input v-model="searchField" @input="throttledSearch" class="form-control input-search" placeholder="Поиск по заявителю, телефону">
                        </th>
                        <th colspan="4" class="cst-col-188 cst-col-select">
                            <select class="form-control" id="inputGroupSelect01" v-model="dispatchStatusFilter" v-on:change="startSearch">
                                <option value="all">Статус заявки</option>
                                <option value="created">Создана</option>
                                <option value="assigned">Назначена</option>
                                <option value="executed">Выполнена</option>
                                <option value="rejected">Отказано</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(claim, index) in claims" :key="index">
                        <th>
                            {{claim.created_at_shortened}}
                            <div class="container-icon">
                                <i class="fas fa-exclamation fa-3x" v-if="claim.status === 'created'" title="новая заявка" style="color: #fffa31;"></i>
                            </div>
                        </th>
                        <td v-if="claim.firstname === '' && claim.middlename === '' && claim.lastname === ''">Нет данных</td>
                        <td v-else>{{claim.firstname}} {{claim.middlename}} {{claim.lastname}}</td>
                        <td>{{claim.phone}}</td>
                        <td>{{ claim.address.district }} / {{ claim.address.location }}</td>
                        <td class="cst-col-188">{{ claim.translatedStatus }}</td>
                        <td>
                            <div style="cursor: pointer;" @click="show(claim)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                            <div class="container-icon">
                                <i class="fas fa-bookmark fa-2x" v-if="claim.status === 'created'" style="color: dimgrey;"  title="новая заявка"></i>
                                <i class="fas fa-bookmark fa-2x" v-if="claim.status === 'assigned'" style="color: #9dbcf5;" title="заявка в работе"></i>
                                <i class="fas fa-bookmark fa-2x" v-if="claim.status === 'executed'" style="color: #fffa31;" title="выполненая заявка"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <datatable-custom-paginator
            v-on:setAnotherPage="getAllClaimsOfOrganization({
                organization_id : userState.user.organization.id,
                dispatchStatusFilter : dispatchStatusFilter, search : searchField,
            })"></datatable-custom-paginator>

        </div>

        <update-status-claims :claim="claim"></update-status-claims>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../store/functional/organization/types';
    import {headings, statusDialog, plusButton} from '../../../domain/util/interface/CommonInterface';
    import UserState from '../../../store/common/user/types';
    import UpdateStatusClaims from '@/components/functional/claims/UpdateStatusClaims.vue';
    import throttle from '../../../store/util/operations/throttle';
    import ClaimService from '../../../domain/services/functional/claims/ClaimService';
    import DatatableCustomPaginator from '../../../components/util/DatatableCustomPaginator.vue';
    import IPaginationState from '../../../store/util/pagination/types';

    @Component({
        components: {
            UpdateStatusClaims, DatatableCustomPaginator
        },
    })
    export default class SpecialistApplications extends Vue {
        @Provide()
        public searchField: string = '';

        @Provide()
        public dispatchStatusFilter: string = 'all';

        @State('organization')
        public organizationState!: OrganizationState;

        @State('user')
        public userState!: UserState;

        @State('pagination') public paginationState!: IPaginationState;

        @Action('getAllClaimsOfOrganization')
        public getAllClaimsOfOrganization;

        @Action('getAllChildrenOrganization')
        public getAllChildrenOrganization;

        @Provide()
        public tableColumns = [
            {label: 'Дата'},
            {label: 'Заявитель'},
            {label: 'Телефон'},
            {label: 'Адрес (район / адрес)'},
            {label: 'Статус обработки'},
            {label: ''},
        ];

        @Provide()
        public claim: {} = {
            name: '',
            description: '',
            firstname: '',
            middlename: '',
            lastname: '',
            phone: '',
            status: '',
        };

        constructor() {
            super();
            headings.title = 'Все заявки';
            statusDialog.show = false;
            plusButton.visible = false;
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

        public startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;

            this.getAllClaimsOfOrganization({
                organization_id : this.userState.user.organization.id,
                dispatchStatusFilter : this.dispatchStatusFilter, search : this.searchField,
            });
        }

        public created() {
            this.getAllClaimsOfOrganization({
                organization_id : this.userState.user.organization.id,
                dispatchStatusFilter : this.dispatchStatusFilter,
                search : this.searchField });

            this.getAllChildrenOrganization({organization_id : this.userState.user.organization.id });
        }

        public show(row) {
            this.claim = row;
            statusDialog.show = true;
        }

        get claims() {
           return ClaimService.changeTimeFormat(this.organizationState.claims);
        }

    }
</script>

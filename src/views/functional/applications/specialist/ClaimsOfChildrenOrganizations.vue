<template>
    <div>
        <div class="main-page" id="specialistApplications">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th colspan="4">
                            <input v-model="searchField" @input="throttledSearch" class="form-control input-search" placeholder="Поиск по заявителю, телефону">
                        </th>
                        <th colspan="4" class="cst-col-188 cst-col-select">
                            <select class="form-control" id="inputGroupSelect01" v-model="dispatchStatusFilter" v-on:change="startSearch">
                                <option value="all">Все заявки</option>
                                <option value="created">Создана</option>
                                <option value="assigned">Назначена</option>
                                <option value="executed">Выполнена</option>
                                <!-- <option value="rejected">Отказано</option> -->
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}} 
                            <span v-if="column.sort"><i class="fas fa-sort" @click="sortByDataFunc"></i></span>
                            <span v-if="column.icon"><i v-bind:class="[column.icon]"></i></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(claim, index) in claims" :key="index" v-bind:class="['claim_' + claim.status]" :title="getTitle(claim.status)">
                        <td>{{claim.created_at_shortened}}</td>
                        <td>{{ fullname(claim) }}</td>
                        <td>{{ claim.phone }}</td>
                        <td>{{ address(claim) }}</td>
                        <td class="cst-col-188">{{ claim.translatedStatus }}</td>
                        <td>
                            <div class="container-icon" @click="show(claim)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <datatable-custom-paginator
            v-on:setAnotherPage="getClaimsToChildrenOrganization({
                organization_id : userState.user.organization.id,
                dispatchStatusFilter : dispatchStatusFilter, search : searchField,
                sortByData: sortByData,
            })"></datatable-custom-paginator>

        </div>

        <update-status-claims :claim="claim" :sortByData="sortByData"></update-status-claims>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../../store/functional/organization/types';
    import {headings, plusButton} from '@/domain/util/interface/CommonInterface';
    import UserState from '../../../../store/common/user/types';
    import UpdateStatusClaims from '@/components/functional/claims/UpdateStatusClaims.vue';
    import throttle from '../../../../store/util/operations/throttle';
    import ClaimService from '../../../../domain/services/functional/claims/ClaimService';
    import DatatableCustomPaginator from '../../../../components/util/DatatableCustomPaginator.vue';
    import IPaginationState from '../../../../store/util/pagination/types';
    import CommentState from '../../../../store/functional/comment/types';
    import AppService from '@/domain/services/common/AppService';

    @Component({
        components: {
            UpdateStatusClaims, DatatableCustomPaginator,
        },
    })
    export default class ExecutedClaims extends Vue {
        @Provide()
        public searchField: string = '';

        @Provide()
        public dispatchStatusFilter: string = 'all';

        @Provide()
        public sortByData: string = 'desc';

        @State('organization')
        public organizationState!: OrganizationState;

        @State('user')
        public userState!: UserState;

        @State('pagination') public paginationState!: IPaginationState;
        @State('comment') public commentState!: CommentState;

        @Action('getClaimsToChildrenOrganization')
        public getClaimsToChildrenOrganization;

        @Action('getAllChildrenOrganization')
        public getAllChildrenOrganization;

        @Provide()
        public tableColumns = [
            {label: 'Дата', sort: true, icon: ''},
            {label: 'Заявитель', sort: false, icon: ''},
            {label: 'Телефон', sort: false, icon: ''},
            {label: 'Адрес (район / адрес)', sort: false, icon: ''},
            {label: 'Статус обработки', sort: false, icon: ''},
            {label: '', sort: false, icon: 'fas fa-cog'},
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
            headings.title = 'Заявки организаций';
            plusButton.visible = false;
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

        public fullname(claim) {
            const key = ['firstname', 'middlename', 'lastname'];
            return AppService.assembleString(claim, key);
        }

        public address(claim) {
            if (claim.hasOwnProperty('address')) {
                const key = ['district', 'location'];
                return AppService.assembleString(claim.address, key, ', ');
            } else {
                return AppService.assembleString({}, []);
            }
        }

        public startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;

            this.getClaimsToChildrenOrganization({
                organization_id : this.userState.user.organization.id,
                dispatchStatusFilter : this.dispatchStatusFilter, search : this.searchField,
                sortByData: this.sortByData,
            });
        }

        public created() {
            this.getClaimsToChildrenOrganization({
                organization_id : this.userState.user.organization.id,
                dispatchStatusFilter : this.dispatchStatusFilter,
                search : this.searchField, sortByData: this.sortByData });

            // this.getAllChildrenOrganization({organization_id : this.userState.user.organization.id });
        }

        public show(row) {
            this.commentState.comment.text = '';
            this.claim = row;
            $('#updateStatusClaims').modal('show');
        }

        get claims() {
           return ClaimService.changeTimeFormat(this.organizationState.claims);
        }

        public sortByDataFunc() {
            this.sortByData = (this.sortByData === 'desc') ? 'asc' : 'desc';
            this.getClaimsToChildrenOrganization({
                organization_id : this.userState.user.organization.id,
                dispatchStatusFilter : this.dispatchStatusFilter,
                search : this.searchField, sortByData: this.sortByData });
        }

        public getTitle(status) {
            const claimStatus = {
                created : 'новая заявка',
                assigned : 'заявка в работе',
                executed : 'выполненая заявка',
            }
            return claimStatus[status];
        }

    }
</script>

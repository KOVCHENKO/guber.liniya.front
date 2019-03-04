<template>
    <div id="specialistApplications">
        <div class="main-page">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}} 
                            <span v-if="column.hasOwnProperty('filter')">
                                <span><i class="fas fa-filter container-icon" @click="useFilter(column)"></i></span>
                                <base-filter :column="column">
                                    <component @search="search($event)" v-bind:is="column.component" :dataFilter.sync="dataFilter" :dataFilterString="column.dataFilterString"></component>
                                </base-filter>
                            </span>
                            <span v-if="column.hasOwnProperty('sort')" @click="sortClaims(column)">
                                <i class="fas cst-sort" @mouseenter="column.hover = !(column.sort) ? 'fa-sort-up' : ''" @mouseleave="column.hover=''" 
                                v-bind:class="[ column.hover, { 'fa-sort-up' : (column.sort == 'asc'), 'fa-sort-down': (column.sort == 'desc') }]"></i>
                            </span>
                            <span v-if="column.hasOwnProperty('icon')"><i v-bind:class="[column.icon]"></i></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(claim, index) in claims" :key="index">
                        <td>{{claim.created_at_shortened}}</td>
                        <td>{{ fullname(claim) }}</td>
                        <td><span>{{ phone(claim) }}</span></td> 
                        <td>{{ address(claim) }}</td>
                        <td>
                            <div class="container-icon" @click="show(claim)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <datatable-custom-paginator v-on:setAnotherPage="getClaimsToChildrenOrganization(dataFilter)">
            </datatable-custom-paginator>

        </div>

        <update-status-claims :claim="claim" :dataFilter="dataFilter"></update-status-claims>

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
    import BaseFilter from '@/components/base/BaseFilter.vue';
    import SearchField from '@/components/base/filters/SearchFieldNew.vue';
    import DateField from '@/components/base/filters/DateField.vue';

    @Component({
        components: {
            UpdateStatusClaims, DatatableCustomPaginator, BaseFilter,
        },
    })
    export default class ClaimsOfChildrenOrganizations extends Vue {

        @Provide()
        public status: string = '';

        @Provide()
        public hoverClass: string = '';

        @State('organization')
        public organizationState!: OrganizationState;

        @State('user')
        public userState!: UserState;

        @State('pagination') public paginationState!: IPaginationState;
        @State('comment') public commentState!: CommentState;

        @Action('getClaimsToChildrenOrganization')
        public getClaimsToChildrenOrganization;

        // @Action('getAllChildrenOrganization')
        // public getAllChildrenOrganization;

        @Provide()
        public tableColumns = [
            {label: 'Дата', name: 'date', filter: false,
            component: DateField, sort: 'asc', hover: false, dataFilterString: 'date'},
            {label: 'Заявитель', name: 'initials', filter: false,
            component: SearchField, sort: false, hover: false, dataFilterString: 'initials'},
            {label: 'Телефон', name: 'phone', filter: false,
            component: SearchField, sort: false, hover: false, dataFilterString: 'phone'},
            {label: 'Адрес (район / адрес)', name: 'address', filter: false,
            component: SearchField, sort: false, hover: false, dataFilterString: 'address'},
            {label: '', icon: 'fas fa-cog'},
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
            organization_id: '',
            responsible_organization: [
                {name : ''},
            ],
        };

        constructor() {
            super();
            headings.title = 'Новые заявки';
            plusButton.visible = false;
        }

        get dataFilter() {
            return {
                organization_id : this.userState.user.organization.id,
                status : this.status,
                initials : '', phone : '', address : '',
                minDate : '', maxDate : '', field : 'date', direction : 'asc',
            };
        }

        public fullname(claim) {
            const key = ['firstname', 'middlename', 'lastname'];
            return AppService.assembleStringCheck(claim, key, 'applicant');
        }

        public address(claim) {
            const key = ['city', 'district', 'street', 'building'];
            return AppService.assembleStringCheck(claim, key, 'address', ', ');
        }

        public phone(claim) {
            const key = ['phone'];
            return AppService.assembleStringCheck(claim, key, 'applicant');
        }

        public startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;
            this.getClaimsToChildrenOrganization(this.dataFilter);
        }

        public created() {
            this.startSearch();
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

        public useFilter(row) {
            const filter = !row.filter;
            this.tableColumns.map((column) => {
                if (column.hasOwnProperty('filter')) {
                    column.filter = false;
                }
                return column;
            });
            row.filter = filter;
        }

        public sortClaims(row) {
            row.hover = false;
            const sort = (row.sort === 'asc') ? 'desc' : 'asc';
            // визуальное отображение
            this.tableColumns.map((column) => {
                if (column.hasOwnProperty('sort')) {
                    column.sort = false;
                }
                return column;
            });
            row.sort = sort;

            // запрос на бэк
            this.dataFilter.direction = sort;
            this.dataFilter.field = row.name;
            this.startSearch();
        }

        public search(value: any) {
            throttle(this.startSearch, 2000)();
        }

        public searchByDate(value: any) {
            this.startSearch();
        }

        public dataFilterString(column) {
            return this.dataFilter[column.dataFilter];
        }

    }

</script>

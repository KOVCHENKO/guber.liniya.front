<style>
    .cst-sort {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    .cst-sort:hover {
        background: none;
    }
</style>
<template>
    <div class="tab-pane fade show active" id="current" role="tabpanel" aria-labelledby="created_claims">
            <br>
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
                        <td><span v-if="claim.hasOwnProperty('applicant')">{{ claim.applicant.phone }}</span></td> <!-- TODO : claim.phone -->
                        <td>{{ address(claim) }}</td>
                        <td>
                            <div class="container-icon" @click="show(claim)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <datatable-custom-paginator v-on:setAnotherPage="getAllClaimsOfOrganization2(dataFilter)">
            </datatable-custom-paginator>

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
    import Applicant from '@/views/functional/applications/specialist/filters/Applicant.vue';
    import Phone from '@/views/functional/applications/specialist/filters/Phone.vue';
    import Address from '@/views/functional/applications/specialist/filters/Address.vue';
    import Date from '@/views/functional/applications/specialist/filters/Date.vue';
    import BaseFilter from '@/components/base/BaseFilter.vue';

    @Component({
        components: {
            UpdateStatusClaims, DatatableCustomPaginator, BaseFilter,
        },
    })
    export default class CreatedClaims extends Vue {

        @Provide()
        public status: string = ''; // 'created';

        // TODO: удалить
        @Provide()
        public sortByData: string = 'desc';

        @Provide()
        public hoverClass: string = '';

        @State('organization')
        public organizationState!: OrganizationState;

        @State('user')
        public userState!: UserState;

        @State('pagination') public paginationState!: IPaginationState;
        @State('comment') public commentState!: CommentState;

        @Action('getAllClaimsOfOrganization')
        public getAllClaimsOfOrganization;

        @Action('getAllClaimsOfOrganization2')
        public getAllClaimsOfOrganization2;

        @Action('getAllChildrenOrganization')
        public getAllChildrenOrganization;

        @Provide()
        public tableColumns = [
            {label: 'Дата', filter: false, component: Date, sort: 'asc', hover: false},
            {label: 'Заявитель', filter: false, component: Applicant, sort: false, hover: false },
            {label: 'Телефон', filter: false, component: Phone, sort: false, hover: false},
            {label: 'Адрес (район / адрес)', filter: false, component: Address, sort: false, hover: false},
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
        };
        // TODO: убрать в родителя
        constructor() {
            super();
            headings.title = 'Новые заявки';
            plusButton.visible = false;
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

        get dataFilter() {
            return {
                organization_id : this.userState.user.organization.id,
                status : this.status,
                initials : '', phone : '', address : '',
                minDate : '', maxDate : '',
            };
        }

        public fullname(claim) {
            if (claim.hasOwnProperty('applicant')) {
                const key = ['firstname', 'middlename', 'lastname'];
                return AppService.assembleString(claim.applicant, key);
            } else {
                return AppService.assembleString({}, []);
            }
        }

        public address(claim) {
            if (claim.hasOwnProperty('address')) {
                const key = ['city', 'district', 'street', 'building'];
                return AppService.assembleString(claim.address, key, ', ');
            } else {
                return AppService.assembleString({}, []);
            }
        }

        public startSearch() {
            // Обнулить и поставить страницу №1
            this.paginationState.currentPage = 1;
            this.getAllClaimsOfOrganization2(this.dataFilter);
        }

        public created() {
            this.startSearch();
        }

        public show(row) {
            this.commentState.comment.text = '';
            this.claim = row;
            $('#updateStatusClaims').modal('show');
        }

        get claims() {
            return ClaimService.changeTimeFormat(this.organizationState.claims);
        }

        // public sortByDataFunc() {
        //     this.sortByData = (this.sortByData === 'desc') ? 'asc' : 'desc';
        //     this.getAllClaimsOfOrganization({
        //         organization_id : this.userState.user.organization.id,
        //         dispatchStatusFilter : this.dispatchStatusFilter,
        //         search : this.searchField, sortByData: this.sortByData });
        // }

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
            this.tableColumns.map((column) => {
                if (column.hasOwnProperty('sort')) {
                    column.sort = false;
                }
                return column;
            });
            row.sort = sort;
        }

    }

</script>

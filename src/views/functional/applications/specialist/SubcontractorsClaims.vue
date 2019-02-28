<template>
    <div class="tab-pane fade show active" id="current" role="tabpanel" aria-labelledby="subcontractors_claims">

        <br>
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
                <tr v-for="(subcontractor, index) in organizationState.subcontractors" :key="index">
                    <td>{{ createdClaim(subcontractor) }}</td>
                    <td>{{ subcontractor.description }}</td>
                    <td>{{ nameOrg(subcontractor) }}</td>
                    <td>{{ translatedSubcontractorStatus(subcontractor) }}</td>
                    <td>
                        <div class="container-icon">
                            <i class="fas fa-pencil-alt" @click="show(subcontractor)"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <datatable-custom-paginator v-on:setAnotherPage="getClaimsSubcontractors(dataFilter)">
            </datatable-custom-paginator>

        <update-subcontractor-claim :subcontractor="subcontractor" :claim="subcontractor.claim[0]"></update-subcontractor-claim>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../../store/functional/organization/types';
    import TimeFormatter from '@/domain/util/formatters/TimeFormatter';
    import ClaimService from '@/domain/services/functional/claims/ClaimService';
    import UpdateSubcontractorClaim from '@/components/functional/claims/UpdateSubcontractorClaim.vue';
    import UserState from '../../../../store/common/user/types';
    import BaseFilter from '@/components/base/BaseFilter.vue';
    import SearchField from '@/components/base/filters/SearchFieldNew.vue';
    import SelectField from '@/components/base/filters/SelectField.vue';
    import DateField from '@/components/base/filters/DateFieldSubcontr.vue';
    import throttle from '../../../../store/util/operations/throttle';
    import DatatableCustomPaginator from '../../../../components/util/DatatableCustomPaginator.vue';
    import IPaginationState from '../../../../store/util/pagination/types';

    @Component({
        components: {
            UpdateSubcontractorClaim, BaseFilter, DatatableCustomPaginator,
        },
    })
    export default class SubcontractorsClaims extends Vue {

        @Action('getClaimsSubcontractors')
        public getClaimsSubcontractors;

        @State('organization')
        public organizationState!: OrganizationState;

        @State('pagination')
        public paginationState!: IPaginationState;

        @State('user')
        public userState!: UserState;

        get dataFilter() {
            return {
                organization_id : this.userState.user.organization.id,
                description : '', status : '', organization : '',
                minDate : '', maxDate : '', field : 'date', direction : 'asc',
            };
        }

        @Provide()
        public tableColumns = [
            {label: 'Дата', name: 'date', filter: false,
            component: DateField, sort: 'asc', hover: false, dataFilterString: 'date'},
            {label: 'Описание', name: 'description', filter: false,
            component: SearchField, sort: false, hover: false, dataFilterString: 'description'},
            {label: 'Организация', name: 'organization', filter: false,
            component: SearchField, sort: false, hover: false, dataFilterString: 'organization'},
            {label: 'Статус', name: 'status', filter: false,
            component: SelectField, sort: false, hover: false, dataFilterString: 'status'},
            {label: '', icon: 'fas fa-cog'},
        ];

        @Provide()
        public subcontractor: {} = {
            status: '',
            claim: [{
                name: '',
                description: '',
                firstname: '',
                middlename: '',
                lastname: '',
                phone: '',
                status: '',
            }],
        };

        public created() {
            this.startSearch();
        }

        public startSearch() {
            this.paginationState.currentPage = 1;
            this.getClaimsSubcontractors(this.dataFilter);
        }

        public formatTime(timeField) {
            return TimeFormatter.formatTime(timeField);
        }

        public translatedSubcontractorStatus(subcontractor) {
            return ClaimService.addTranslatedSubcontractorStatus(subcontractor);
        }

        public show(row) {
            this.subcontractor = row;
            $('#updateSubcontractorClaim').modal('show');
        }

        public createdClaim(subcontractor) {
            if (subcontractor.hasOwnProperty('claim') &&
                subcontractor.claim.length > 0) {
                return this.formatTime(subcontractor.claim[0].created_at);
            } else {
                return 'Нет данных';
            }
        }

        public nameOrg(subcontractor) {
            if (subcontractor.hasOwnProperty('claim') &&
                subcontractor.claim.length > 0 &&
                subcontractor.claim[0].hasOwnProperty('responsible_organization') &&
                subcontractor.claim[0].responsible_organization.length > 0) {
                return subcontractor.claim[0].responsible_organization[0].name;
            } else {
                return 'Нет данных';
            }
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

        public search(value: any) {
            throttle(this.startSearch, 2000)();
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

    }

</script>

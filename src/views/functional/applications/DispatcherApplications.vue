<!--suppress TypeScriptUnresolvedVariable -->
<template>
    <div>
        
        <div class="main-page">
            <input v-model="searchField" @input="throttledSearch" class="form-control" placeholder="Поиск">

            <datatable
                    :columns="tableColumns"
                    :data="claims"
            >
                <template slot-scope="{ row }">
                    <tr>
                        <td>{{ row.created_at }}</td>
                        <td>{{row.firstname}} {{row.middlename}} {{row.lastname}}</td>
                        <td>{{ row.phone }}</td>
                        <td>{{ row.address.district }} / {{ row.address.location }}</td>
                        <td>{{ row.dispatch_status }}</td>
                        <td>
                            <div style="cursor: pointer;" @click="show(row)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                    </tr>
                </template>
            </datatable>


            <datatable-custom-paginator
                    v-on:setAnotherPage="getAllClaims({ dispatchStatus: $route.params.dispatch_status })"
            ></datatable-custom-paginator>

        </div>

        <update-application></update-application>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import DatatableCustomPaginator from '../../../components/util/DatatableCustomPaginator.vue';
    import UpdateApplication from '@/components/functional/applications/UpdateApplication/UpdateApplication.vue';
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
        },
    })
    export default class DispatcherApplications extends Vue implements IWithRoute {
        @Provide()
        public searchField: string = '';

        @Provide()
        public tableColumns = [
            {label: 'Дата'},
            {label: 'Заявитель'},
            {label: 'Телефон'},
            {label: 'Адрес (район / адрес)'},
            {label: 'Статус обработки'},
            {label: ''},
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
            this.getAllClaims({ dispatchStatus: this.$route.params.dispatch_status });
        }

        public show(claim) {
            let problem = new Problem(0, '', '');

            if (claim.problem !== null) {
                problem = new Problem(claim.problem.id, claim.problem.description, claim.problem.description);
            }

            this.claimState.claim = new Claim(claim.id, 'no_name', claim.description, claim.firstname,
                claim.middlename, claim.lastname, claim.phone, claim.email, claim.link, claim.dispatch_status, null,
                claim.parents,
                new Address(claim.address.id, claim.address.district, claim.address.location), problem,
                new Call(0, '', '', '', 'success', 'in',  '', '', ''));

            statusDialog.show = true;
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

        get claims() {
            return ClaimService.resolveClaimDispatchStatus(this.claimState.claims);
        }

        public startSearch() {
            if (this.searchField === '') {
                this.getAllClaims({ dispatchStatus: this.$route.params.dispatch_status });
                return;
            }
            this.searchClaim({search: this.searchField, dispatchStatus: this.$route.params.dispatch_status });
        }


    }
</script>

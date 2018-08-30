<template>
    <div>
        
        <div class="main-page">
            <input v-model="searchField" @input="throttledSearch" class="form-control" placeholder="Поиск">

            <datatable
                    :columns="tableColumns"
                    :data="claimState.claims"
            >
                <template slot-scope="{ row }">
                    <tr>
                        <td>{{ row.id }}</td>
                        <td>{{ row.description }}</td>
                        <td>{{ row.phone }}</td>
                        <td>{{ row.created_at }}</td>
                        <td>{{row.firstname}} {{row.middlename}} {{row.lastname}}</td>
                        <td>
                            <div style="cursor: pointer;" @click="show(row)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                    </tr>
                </template>
            </datatable>


            <datatable-custom-paginator
                    v-on:setAnotherPage="getAllClaims"
            ></datatable-custom-paginator>

        </div>

        <create-application></create-application>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import DatatableCustomPaginator from '../../../components/util/DatatableCustomPaginator.vue';
    import CreateApplication from '@/components/functional/applications/CreateApplication/CreateApplication.vue';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../store/functional/claim/types';
    import {headings, plusButton, statusDialog} from '../../../domain/util/interface/CommonInterface';
    import Claim from '../../../domain/entities/functional/Claim';
    import Address from '../../../domain/entities/functional/Address';
    import Problem from '../../../domain/entities/functional/Problem';
    import throttle from '../../../store/util/operations/throttle';

    @Component({
        components: {
            DatatableCustomized,
            CreateApplication,
            DatatableCustomPaginator,
        },
    })
    export default class DispatcherApplications extends Vue {
        @Provide()
        public searchField: string = '';

        @Provide()
        public tableColumns = [
            {label: 'id'},
            {label: 'Описание'},
            {label: 'Телефон'},
            {label: 'Дата'},
            {label: 'Заявитель'},
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
            this.getAllClaims();
        }

        public show(claim) {
            let problem = new Problem(0, '', '');

            if (claim.problem !== null) {
                problem = new Problem(claim.problem.id, claim.problem.description, claim.problem.description);
            }

            this.claimState.claim = new Claim(claim.id, 'no_name', claim.description, claim.firstname,
                claim.middlename, claim.lastname, claim.phone, claim.email, claim.link,
                new Address(claim.address.id, claim.address.district, claim.address.location),
                problem);

            statusDialog.show = true;
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

        public startSearch() {
            if (this.searchField == '') {
                this.getAllClaims();
                return;
            } 
            this.searchClaim({search: this.searchField});
        }


    }
</script>

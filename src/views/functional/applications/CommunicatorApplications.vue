<!--suppress TypeScriptUnresolvedVariable -->
<template>
    <div>

        <div class="main-page">

            <datatable
                    :columns="tableColumns"
                    :data="claimState.executedClaims"
            >
                <template slot-scope="{ row }">
                    <tr>
                        <td>{{ row.created_at }}</td>
                        <td>{{row.firstname}} {{row.middlename}} {{row.lastname}}</td>
                        <td>{{ row.phone }}</td>
                        <td>{{ row.address.district }} / {{ row.address.location }}</td>
                        <td>{{ row.close_status }}</td>
                        <td>
                            <div style="cursor: pointer;" @click="show(row)">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                        </td>
                    </tr>
                </template>
            </datatable>


            <datatable-custom-paginator
                    v-on:setAnotherPage="getExecutedClaims()"
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

    @Component({
        components: {
            DatatableCustomized,
            DatatableCustomPaginator,
            CloseClaim,
        },
    })
    export default class CommunicatorApplications extends Vue implements IWithRoute {
        @Provide()
        public tableColumns = [
            {label: 'Дата'},
            {label: 'Заявитель'},
            {label: 'Телефон'},
            {label: 'Адрес (район / адрес)'},
            {label: 'Статусы закрытия'},
            {label: ''},
        ];

        @State('claim')
        public claimState!: ClaimState;

        @Action public getExecutedClaims;

        constructor() {
            super();
            headings.title = 'Выполеннные заявки';
            plusButton.visible = false;
        }

        public created() {
            this.getExecutedClaims();
        }

        public show(claim) {
            this.claimState.claim = new Claim(claim.id, 'no_name', claim.description, claim.firstname, claim.middlename,
                claim.lastname, claim.phone, claim.email, claim.link,
                claim.status, claim.dispatch_status, null, claim.level, claim.parents,
                claim.comments, new Address(claim.address.id, claim.address.district, claim.address.location),
                new Problem(claim.problem.id, claim.problem.description, claim.problem.description),
                new Call(0, '', '', '', 'success', 'in',  '', '', ''));

            statusDialog.show = true;
        }

    }
</script>

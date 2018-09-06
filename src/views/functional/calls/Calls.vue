<template>
    <div>
        <datatable
                :columns="tableColumns"
                :data="callState.calls"
        >
            <template slot-scope="{ row }">
                <tr>
                    <td>{{ row.created_at }}</td>
                    <td>{{ row.phone }}</td>
                    <td>
                        <div style="cursor: pointer;" @click="resolve(row)">
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                    </td>
                </tr>
            </template>
        </datatable>

        <datatable-custom-paginator
                v-on:setAnotherPage="getAllClaims({ dispatchStatus: $route.params.dispatch_status })"
        ></datatable-custom-paginator>

        <resolve-call></resolve-call>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import DatatableCustomPaginator from '../../../components/util/DatatableCustomPaginator.vue';
    import CallState from '../../../store/functional/call/types';
    import ResolveCall from '@/components/functional/calls/calls/ResolveCall.vue';
    import Problem from '../../../domain/entities/functional/Problem';
    import Claim from '../../../domain/entities/functional/Claim';
    import ClaimState from '../../../store/functional/claim/types';
    import Address from '../../../domain/entities/functional/Address';
    import {statusDialog} from '../../../domain/util/interface/CommonInterface';
    import Call from '../../../domain/entities/functional/Call';

    @Component({
        components: {
            DatatableCustomPaginator,
            ResolveCall,
        },
    })
    export default class Calls extends Vue {

        @Action public getCalls;

        @State('call') public callState!: CallState;
        @State('claim') public claimState!: ClaimState;

        @Provide()
        public tableColumns = [
            {label: 'Дата'},
            {label: 'Телефон'},
            {label: ''},
        ];

        constructor() {
            super();
            this.getCalls();
        }

        /**
         * Обработать звонок - новый, З - заявка, ПЗ - повторный звонок, О - ошибка
         */
        public resolve(call) {
            this.claimState.claim = new Claim(0, '', '', '', '', '', call.phone, '', call.link, '',
                new Address(0, 'Астрахань', ''),
                new Problem(0, '', ''),
                new Call(call.id, call.call_id, call.phone, call.link, call.ats_status, 'in',
                    '', 'raw', call.created_at));

            statusDialog.show = true;
        }
    }
</script>

<style scoped>

</style>
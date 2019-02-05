<template>
    <div class="main-page">
        <table class="table table-hover">
            <thead>
            <tr>
                <th colspan="2">
                    <select class="form-control" id="inputGroupSelect01"
                            v-model="callState.filter.dateFilter"
                            v-on:change="changeFilter">
                        <option value="all">Все</option>
                        <option value="day">День</option>
                        <option value="week">Неделя</option>
                        <option value="period">Период</option>
                    </select>
                </th>
                <th colspan="1">
                    С: <date-picker
                        :disabled="callState.filter.dateFilter !== 'period'" v-on:input="changeFilter"
                        v-model="callState.filter.from"
                        format="dd.MM.yyyy"
                        placeholder="01.01.2018"
                        :language="ru"
                ></date-picker>
                </th>
                <th colspan="1">
                    По: <date-picker
                        :disabled="callState.filter.dateFilter !== 'period'" v-on:input="changeFilter"
                        v-model="callState.filter.to"
                        format="dd.MM.yyyy"
                        placeholder="01.01.2019"
                        :language="ru"
                ></date-picker>
                </th>
            </tr>
            <tr>
                <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(call, index) in calls" :key="index">
                <td>{{ call.created_at }}</td>
                <td>{{ call.phone }}</td>
                <td>{{ call.processing_status }}</td>
                <td>
                    <div style="cursor: pointer;" @click="resolve(call)">
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <datatable-custom-paginator
                v-on:setAnotherPage="getCalls()"
        ></datatable-custom-paginator>

        <resolve-call></resolve-call>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import DatatableCustomPaginator from '@/components/util/DatatableCustomPaginator.vue';
    import CallState from '@/store/functional/call/types';
    import ResolveCall from '@/components/functional/calls/calls/ResolveCall.vue';
    import ClaimState from '@/store/functional/claim/types';
    import {headings, statusDialog} from '@/domain/util/interface/CommonInterface';
    import Call from '@/domain/entities/functional/Call';
    import CallService from '@/domain/services/functional/calls/CallService';
    import DatePicker from 'vuejs-datepicker';
    import {en, ru} from 'vuejs-datepicker/dist/locale';
    import IPaginationState from '@/store/util/pagination/types';


    @Component({
        components: {
            DatatableCustomPaginator,
            ResolveCall,
            DatePicker,
        },
    })
    export default class Calls extends Vue {

        @Action public getCalls;

        @State('call') public callState!: CallState;
        @State('claim') public claimState!: ClaimState;
        @State('pagination') public paginationState!: IPaginationState;

        @Provide() public ru: any = ru;

        @Provide()
        public tableColumns = [
            {label: 'Дата'},
            {label: 'Телефон'},
            {label: 'Статус обработки'},
            {label: ''},
        ];

        constructor() {
            super();
            headings.title = 'Все звонки';
            this.getCalls();
        }

        /**
         * Обработать звонок - новый, З - заявка, ПЗ - повторный звонок, О - ошибка
         */
        public resolve(call) {
            this.callState.call = new Call(call.id, call.call_id, call.phone, call.link, call.ats_status, 'in',
                '', 'raw', call.created_at);

            this.claimState.claim = {
                id: 0,
                name: '',
                description: '',
                phone: call.phone,
                link: call.link,
                dispatchStatus: '',
                status: '',
                level: '',
                pid: 0,
                call: this.callState.call,
                parents: [{}],
                comments: [],
                created_at: '',
                problem: {
                    id: 0,
                    name: '',
                    description: '',
                }
            };

            $('#resolveCall').modal('show');
        }

        public changeFilter() {
            this.paginationState.currentPage = 1;
            this.getCalls();
        }

        get calls() {
            this.callState.calls = CallService.resolveCallProcessingStatus(this.callState.calls);
            this.callState.calls = CallService.changeTimeFormat(this.callState.calls);

            return this.callState.calls;
        }
    }
</script>

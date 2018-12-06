<template>
    <div>
        <!-- Modal - create problem type -->
        <div class="modal fade" id="claimsStatisticsModal" tabindex="-1" role="dialog"
             aria-labelledby="claimsStatisticsModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="callsReportModalLabel">Статистика заявок</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-2 clearfix">
                                <label class="input-title">Период</label>
                            </div>
                            <div class="col-sm-10 clearfix">
                                <select class="form-control" id="inputGroupSelect01" v-model="reportOption">
                                    <option value="day">1 день</option>
                                    <option value="month">1 месяц</option>
                                    <option value="year">1 год</option>
                                    <option value="range">Интервал</option>
                                </select>
                            </div>
                            <div class="row" v-if="reportOption === 'range'">
                                <div class="col-sm-12 clearfix">
                                    С: <datepicker :language="ru" :format="customFormatter" v-model="from"></datepicker>
                                    По: <datepicker :language="ru" :format="customFormatter" v-model="to"></datepicker>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-2 clearfix">
                                <label class="input-title">Район</label>
                            </div>
                            <div class="col-sm-10 clearfix">
                                <select class="form-control" id="inputGroupSelect02" v-model="chosenDistrict">
                                    <option value="all">Все</option>
                                    <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-2 clearfix">
                                <label class="input-title">Организации</label>
                            </div>
                            <div class="col-sm-10 clearfix">
                                <select class="form-control" id="inputGroupSelect03" v-model="chosenOrganization">
                                    <option value="all">Все</option>
                                    <option v-for="organization in organizationState.organizationTree"
                                            :key="organization.id" :value="organization.id">{{ organization.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-2 clearfix">
                                <label class="input-title">Проблема</label>
                            </div>
                            <div class="col-sm-5 clearfix">
                                <select class="form-control" id="inputGroupSelect04" v-model="chosenProblemType">
                                    <option value="all">Все</option>
                                    <option v-for="problemType in problemTypeState.problemTypes"
                                            :key="problemType.id" :value="problemType">{{ problemType.name }}</option>
                                </select>
                            </div>
                            <div class="col-sm-5 clearfix">
                                <select class="form-control" id="inputGroupSelect05" v-model="chosenProblem">
                                    <option v-for="problem in problems"
                                            :key="problem.id" :value="problem.id">{{ problem.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-2 clearfix">
                                <label class="input-title">Статус обработки</label>
                            </div>
                            <div class="col-sm-10 clearfix">
                                <select class="form-control" id="inputGroupSelect06" v-model="statusFilter">
                                    <option value="all">Все</option>
                                    <option value="assigned">Назначена</option>
                                    <option value="executed">Выполнена</option>
                                    <option value="rejected">Отказано</option>
                                </select>
                            </div>
                        </div>

                        <a :href="
                                baseUrl +
                                'analytics/claims_statistics_report/' +
                                reportOption + '/' +
                                customFrom + '/' +
                                customTo + '/' +
                                chosenDistrict  + '/' +
                                chosenOrganization + '/' +
                                computedChosenProblem + '/' +
                                statusFilter
                        " download>Скачать</a>

                    </div>
                </div>
            </div>
        </div>
        <!--end of modal -->
    </div>
</template>

<script lang="ts">

    import {baseUrl} from '@/globals';
    import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import {ru} from 'vuejs-datepicker/dist/locale';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../store/functional/organization/types';
    import { districts } from '@/domain/entities/functional/Address';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    import IProblem from '../../../domain/entities/functional/interfaces/IProblem';

    @Component({
        components: {Datepicker},
    })
    export default class ClaimsStatisticsAnalytics extends Vue {
        @Action public getAllOrganizations;
        @Action public getAllProblemTypes;

        @State('organization') public organizationState!: OrganizationState;
        @State('problemType') public problemTypeState!: ProblemTypeState;

        @Provide() public problems: IProblem[] = [];
        @Provide() public chosenProblemType: any = 'all';
        @Provide() public chosenProblem: any = 'all';

        @Provide() public statusFilter: any = 'all';
        @Provide() public chosenDistrict: any = 'all';
        @Provide() public chosenOrganization: any = 'all';

        @Provide() public reportOption = 'day';
        @Provide() public from = '';
        @Provide() public to = '';
        @Provide() public ru: any = ru;

        @Provide() public baseUrl = baseUrl;

        @Provide() public districts: string[] = districts;

        public created() {
            this.getAllOrganizations();
            this.getAllProblemTypes();
        }

        public customFormatter(date) {
            return moment(date).format('MMMM Do YYYY');
        }

        @Watch('chosenProblemType')
        private onProblemTypeChange(val: any, oldVal: any) {
            this.problems = val.children;
        }

        get customFrom() {
            return moment(this.from).format('DD.MM.YYYY');
        }

        get customTo() {
            return moment(this.to).format('DD.MM.YYYY');
        }

        get computedChosenProblem() {
            if (this.chosenProblemType === 'all') {
                this.chosenProblem = 'all';

                return this.chosenProblem;
            }
            return this.chosenProblem;
        }

    }
</script>

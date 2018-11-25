<template>
    <div>
        <!-- Modal - create problem type -->
        <div class="modal fade" id="claimsRegisterModal" tabindex="-1" role="dialog"
             aria-labelledby="claimsRegisterModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="callsReportModalLabel">Реестр заявок</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12 clearfix">
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

                        <a :href="baseUrl + 'analytics/claims_register_report/' + reportOption + '/' + customFrom + '/' + customTo" download>Скачать</a>

                    </div>
                </div>
            </div>
        </div>
        <!--end of modal -->
    </div>
</template>

<script lang="ts">
    import {baseUrl} from '@/globals';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import Datepicker from 'vuejs-datepicker';
    import {ru} from 'vuejs-datepicker/dist/locale';
    import moment from 'moment';

    @Component({
        components: {Datepicker},
    })
    export default class ClaimRegisterAnalytics extends Vue {
        @Provide() public reportOption = 'day';
        @Provide() public from = '';
        @Provide() public to = '';
        @Provide() public ru: any = ru;

        @Provide() public baseUrl = baseUrl;

        public customFormatter(date) {
            return moment(date).format('MMMM Do YYYY');
        }

        get customFrom() {
            return moment(this.from).format('DD.MM.YYYY');
        }

        get customTo() {
            return moment(this.to).format('DD.MM.YYYY');
        }
    }
</script>

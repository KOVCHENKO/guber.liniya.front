<template>
    <div>
        <!-- Modal - create problem type -->
        <div class="modal fade" id="callsReportModal" tabindex="-1" role="dialog"
             aria-labelledby="callsReportModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="callsReportModalLabel">Звонки</h4>
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
                                    С: <datepicker v-model="from"></datepicker>
                                    По: <datepicker v-model="to"></datepicker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{ $t("common.close") }}</button>
                        <button type="button" class="btn btn-success" @click="makeReport">Сформировать отчет</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end of modal -->
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import {baseUrl} from '@/globals';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import Datepicker from 'vuejs-datepicker';
    import ErrorNotifier from '../../../domain/util/notifications/ErrorNotifier';

    @Component({
        components: {Datepicker},
    })
    export default class CallsAnalytics extends Vue {

        @Provide() public reportOption = 'day';
        @Provide() public from = null;
        @Provide() public to = null;


        public async makeReport() {
            try {
                const res = await axios.post(`${baseUrl}analytics/calls_report`, {
                    reportOption: this.reportOption,
                    from: this.from,
                    to: this.to,
                });
            } catch {
                ErrorNotifier.notify();
            }
        }

    }
</script>

<template>
    <div>
        
        <div class="row">
            <div class="col-sm-4">
                <div class="cst-btn-icon" @click="callsAnalytics">
                    <img src="/img/call.png">
                    <p>Звонки</p>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="cst-btn-icon" @click="claimsRegister">
                    <img src="/img/order.png">
                    <p>Реестр заявок</p>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="cst-btn-icon" @click="claimsStatistics">
                    <img src="/img/graph.png">
                    <p>Статистика заявок</p>
                </div>
            </div>
        </div>

        <calls-analytics></calls-analytics>
        <claim-register-analytics></claim-register-analytics>
        <claims-statistics-analytics></claims-statistics-analytics>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import CallsAnalytics from '@/components/functional/analytics/CallsAnalytics.vue';
    import ClaimRegisterAnalytics from '@/components/functional/analytics/ClaimRegisterAnalytics.vue';
    import ClaimsStatisticsAnalytics from '@/components/functional/analytics/ClaimsStatisticsAnalytics.vue';

    @Component({
        components: {ClaimsStatisticsAnalytics, CallsAnalytics, ClaimRegisterAnalytics},
    })
    export default class Analytics extends Vue {

        public callsAnalytics() {
            $('#callsReportModal').modal('show');
        }

        public claimsRegister() {
            $('#claimsRegisterModal').modal('show');
        }

        public claimsStatistics() {
            $('#claimsStatisticsModal').modal('show');
        }
    }
</script>

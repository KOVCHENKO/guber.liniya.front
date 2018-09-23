<template>
    <div>
        <h3 @click="callsAnalytics">Звонки</h3>
        <h3 @click="claimsRegister">Реестр заявок</h3>
        <h3 @click="claimsStatistics">Статистика заявок</h3>

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

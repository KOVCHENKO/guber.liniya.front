<template>
    <div>
        <h3 @click="callsAnalytics">Звонки</h3>
        <h3>Реестр заявок</h3>
        <h3>Статистика заявок</h3>

        <calls-analytics></calls-analytics>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import CallsAnalytics from '@/components/functional/analytics/CallsAnalytics.vue';

    @Component({
        components: {CallsAnalytics},
    })
    export default class Analytics extends Vue {

        public callsAnalytics() {
            $('#callsReportModal').modal('show');
        }
    }
</script>

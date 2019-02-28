<template>
    <div>
        С: <datepicker :language="ru" v-model="minDate" @closed="startSearch"></datepicker>
        По: <datepicker :language="ru" v-model="maxDate" @closed="startSearch"></datepicker>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue, Prop} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import IPaginationState from '@/store/util/pagination/types';
    import Datepicker from 'vuejs-datepicker';
    import {en, ru} from 'vuejs-datepicker/dist/locale';
    import moment from 'moment';

    @Component({
        components: {Datepicker},
    })
    export default class DateField extends Vue {

        @Provide() public ru: any = ru;

        @Prop() public dataFilter: any;

        @Provide() public minDate = this.dataFilter.minDate;
        @Provide() public maxDate = this.dataFilter.maxDate;

        @State('pagination') public paginationState!: IPaginationState;

        @Action('getAllClaimsOfOrganization')
        public getAllClaimsOfOrganization;

        public startSearch() {
            this.paginationState.currentPage = 1;

            this.dataFilter.minDate = (this.minDate) ? moment(this.minDate).format('YYYY-MM-DD hh:mm:ss') : '';
            this.dataFilter.maxDate = (this.maxDate) ? moment(this.maxDate).format('YYYY-MM-DD hh:mm:ss') : '';
            this.getAllClaimsOfOrganization(this.dataFilter);
        }

    }
</script>

<template>
    <div>
        С: <datepicker :language="ru" v-model="dataFilterString.minDate" @closed="startSearch"></datepicker>
        По: <datepicker :language="ru" v-model="dataFilterString.maxDate" @closed="startSearch"></datepicker>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue, Prop, Emit} from 'vue-property-decorator';
    import Datepicker from 'vuejs-datepicker';
    import {en, ru} from 'vuejs-datepicker/dist/locale';

    @Component({
        components: {Datepicker},
    })
    export default class DateField extends Vue {

        @Provide() public ru: any = ru;

        @Provide() public dataFilterString: any = {
            minDate: '',
            maxDate: '',
        };

        @Emit('search')
        public search(dataFilterString) {
            // emit searching
        }

        public startSearch() {
            this.search({ string: this.dataFilterString, field: 'date'});
        }




        // get rid of
        //
        // @Prop() public dataFilter: any;
        //
        // @Provide() public minDate = this.dataFilter.minDate;
        // @Provide() public maxDate = this.dataFilter.maxDate;
        //
        // @State('pagination') public paginationState!: IPaginationState;
        //
        // @Action('getAllClaimsOfOrganization2')
        // public getAllClaimsOfOrganization2;
        //
        // public startSearch() {
        //     this.paginationState.currentPage = 1;
        //
        //     this.dataFilter.minDate = (this.minDate) ? moment(this.minDate).format('YYYY-MM-DD hh:mm:ss') : '';
        //     this.dataFilter.maxDate = (this.maxDate) ? moment(this.maxDate).format('YYYY-MM-DD hh:mm:ss') : '';
        //     this.getAllClaimsOfOrganization2(this.dataFilter);
        // }

    }
</script>

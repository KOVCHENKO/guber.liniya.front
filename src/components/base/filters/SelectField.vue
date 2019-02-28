<template>
    <select class="form-control" name="status" v-model="dataFilter[dataFilterString]" @change="startSearch">
        <option></option>
        <option value="opened">Открыто</option>
        <option value="closed">Закрыто</option>
    </select>
</template>

<script lang="ts">

    import {Component, Vue, Prop, Emit, Provide} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import IPaginationState from '@/store/util/pagination/types';

    @Component
    export default class SelectField extends Vue {

        @Prop() public dataFilter: any;

        @Prop() public dataFilterString: any;

        @Action('getClaimsSubcontractors')
        public getClaimsSubcontractors;

        @State('pagination') public paginationState!: IPaginationState;

        public startSearch() {
            this.paginationState.currentPage = 1;
            this.getClaimsSubcontractors(this.dataFilter);
        }

    }
</script>

<template>
    <input v-model="dataFilter.initials" @input="throttledSearch" class="form-control input-search" placeholder="Начните ввод">
</template>

<script lang="ts">

    import {Component, Provide, Vue, Prop} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import throttle from '../../../../../store/util/operations/throttle';
    import IPaginationState from '../../../../../store/util/pagination/types';

    @Component
    export default class Applicant extends Vue {

        @Prop() public dataFilter: any;

        @State('pagination') public paginationState!: IPaginationState;

        @Action('getAllClaimsOfOrganization2')
        public getAllClaimsOfOrganization2;

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

        public startSearch() {
            this.paginationState.currentPage = 1;
            this.getAllClaimsOfOrganization2(this.dataFilter);
        }

    }
</script>
<template>
    <input v-model="dataFilterString" @input="throttledSearch" class="form-control input-search" placeholder="Начните ввод">
</template>

<script lang="ts">

    import {Component, Vue, Prop, Emit, Provide} from 'vue-property-decorator';
    import throttle from '@/store/util/operations/throttle';

    @Component
    export default class SearchField extends Vue {

        @Prop() public dataFilter: any;

        @Provide() public dataFilterString = '';

        @Emit('search')
        public search(dataFilterString) {
            // emit searching
        }

        get throttledSearch() {
            return throttle(this.startSearch, 1000);
        }

        public startSearch() {
            this.search({ string: this.dataFilterString, field: this.dataFilter});
        }

    }
</script>

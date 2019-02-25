<template>
    <input v-model="dataFilter[dataFilterString]" @input="startSearch" class="form-control input-search" placeholder="Начните ввод">
</template>

<script lang="ts">

    import {Component, Vue, Prop, Emit, Provide} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';

    @Component
    export default class SearchFieldNew extends Vue {

        @Prop() public dataFilter: any;

        @Prop() public dataFilterString: any;

        @Emit('search')
        public search(dataFilter) {
            // emit searching
        }

        public startSearch() {
            this.search(this.dataFilter);
        }

    }
</script>

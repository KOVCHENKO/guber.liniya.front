<template>
    <div>
        <v-jstree
                :data="problemTypeState.problemTypesTree"
                multiple
                allow-batch
                whole-row
                allow-transition
                show-checkbox
                size="large">
        </v-jstree>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import {headings, plusButton} from '../../../domain/util/interface/CommonInterface';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    // noinspection TypeScriptCheckImport
    import VJstree from 'vue-jstree';

    @Component({
        components: {VJstree},
    })
    export default class SingleOrganization extends Vue {

        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @Action('getAllProblemTypesWithProblems')
        public getAllProblemTypesWithProblems;

        constructor() {
            super();
            this.getAllProblemTypesWithProblems();

            plusButton.disabled = true;
            headings.title = 'Управление организацией';
            headings.subtitle = '';
        }
    }
</script>

<style scoped>

</style>
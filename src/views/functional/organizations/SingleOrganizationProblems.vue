<template>
    <div>
        <v-jstree
                :data="problemTypeState.problemTypesTree"
                show-checkbox
                multiple
                size="large"
                @item-click="dispatchProblemBindingToOrganization">
        </v-jstree>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import {headings, plusButton} from '../../../domain/util/interface/CommonInterface';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    import IWithRouter from '../../../domain/util/interface/IWithRoute';
    // noinspection TypeScriptCheckImport
    import VJstree from 'vue-jstree';

    @Component({
        components: {VJstree},
    })
    export default class SingleOrganizationProblems extends Vue implements IWithRouter {

        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @Action('getAllProblemTypesWithProblems')
        public getAllProblemTypesWithProblems;

        @Action('bindProblemTypeToOrganization')
        public bindProblemTypeToOrganization;

        constructor() {
            super();

            plusButton.visible = true;
            headings.title = 'Управление организацией';
            headings.subtitle = '';
        }

        public created() {
            // noinspection TypeScriptUnresolvedVariable
            this.getAllProblemTypesWithProblems({id: this.$route.params.id});
        }

        /**
         * @param node
         * @param item - id - ид проблемы, selected - привязана ли проболемы (true, false)
         * @param e
         */
        public dispatchProblemBindingToOrganization(node, item) {
            // noinspection TypeScriptUnresolvedVariable
            this.bindProblemTypeToOrganization({
                problem_id: item.id,
                status: item.selected,
                organization_id: this.$route.params.id,
            });
        }
    }
</script>

<style scoped>

</style>
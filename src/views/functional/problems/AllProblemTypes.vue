<!--suppress TypeScriptCheckImport, XmlUnboundNsPrefix -->
<template>
    <div>
        <div class="heading-page">
            <h2 class="caption-text-center">Проблемы</h2>
            <div class="divider"></div>
        </div>

        <div class="main-page">
            <v-jstree
                    :data="problemTypeState.problemTypes"
                    allow-batch
                    whole-row
                    allow-transition
                    size="large">
                <template slot-scope="_">

                    <div style="display: inherit; width: 10px">
                        <i :class="_.vm.themeIconClasses" role="presentation" v-if="!_.model.loading"></i>
                        {{ _.model.text }}
                        &nbsp &nbsp
                        <i v-if="_.model.type === 'problemType'" @click="addProblem(_.model)" class="fa fa-plus"></i>&nbsp
                        <i v-if="_.model.type === 'problemType'" @click="editProblemType(_.model)" class="fas fa-pencil-alt"></i>
                        <i v-if="_.model.type === 'problem'" @click="editProblem(_.model)" class="fas fa-pencil-alt"></i>&nbsp
                        <i v-if="_.model.type === 'problemType'" @click="removeProblemType(_.model)" class="fas fa-trash-alt"></i>
                        <i v-if="_.model.type === 'problem'" @click="removeProblem(_.model)" class="fas fa-trash-alt"></i>&nbsp
                    </div>
                </template>
            </v-jstree>
        </div>

        <create-problem-type></create-problem-type>
        <edit-problem-type></edit-problem-type>

        <create-problem></create-problem>
        <edit-problem></edit-problem>

    </div>
</template>

<script lang="ts">
    import {plusButton, headings} from '../../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    import CabinetState from '../../../store/common/cabinet/types';
    import CreateProblemType from '@/components/functional/problems/AllProblemTypes/CreateProblemType.vue';
    import EditProblemType from '@/components/functional/problems/AllProblemTypes/EditProblemType.vue';
    import EditProblem from '@/components/functional/problems/SingleProblemType/EditProblem.vue';
    import CreateProblem from '@/components/functional/problems/SingleProblemType/CreateProblem.vue';
    import VJstree from 'vue-jstree';
    import IProblemState from '../../../store/functional/problem/types';

    @Component({
        components: {VJstree, CreateProblemType, CreateProblem, EditProblemType, EditProblem},
    })
    export default class ProblemTypes extends Vue {

        @State('problemType') public problemTypeState!: ProblemTypeState;
        @State('problem') public problemState!: IProblemState;
        @State('cabinet') public cabinetState!: CabinetState;

        @Action('getAllProblemTypes') public getProblemTypes;
        @Action('deleteProblem') public deleteProblem;
        @Action('getSingleProblemType') public getSingleProblemType;
        @Action('getSingleProblem') public getSingleProblem;

        @Provide()
        public treeFilter = '';

        constructor() {
            super();

            plusButton.title = 'Проблемы';
            plusButton.disabled = false;
            plusButton.clickAction = this.createProblemType;
            headings.title = 'Все типы проблем';
            headings.subtitle = 'Выберите проблему';
            this.getProblemTypes();
        }

        public showProblemType(problem) {
            this.$router.push({ name: 'single_problem', params: { id: problem.id }});
        }

        public createProblemType() {
            $('#createProblemTypeModal').modal('show');
        }

        public async editProblemType(problemType) {
            await this.getSingleProblemType({ id: problemType.id });
            $('#editProblemTypeModal').modal('show');
        }

        public async editProblem(problem) {
            await this.getSingleProblem({ id: problem.id });
            $('#editProblemModal').modal('show');
            // edit problem
        }

        public addProblem(problemType) {
            this.problemTypeState.problemType.id = problemType.id;
            $('#createProblemModal').modal('show');
        }

        public removeProblemType(problemType) {
            // remove problem type
        }

        public removeProblem(problem) {
            this.problemState.problem = problem;
            this.deleteProblem();
        }

    }
</script>
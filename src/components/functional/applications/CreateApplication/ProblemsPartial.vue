<template>
    <div>
        <div class="row">
            <div class="col-sm-4">
                
                <md-field>
                    <label for="type_problem">Тип проблемы</label>
                    <md-select name="type_problem" id="type_problem">
                        <md-option v-for="(problemType, index) in problemTypeState.problemTypes" :key="index" :value="problemType.id"
                            @click="chooseProblemType(problemType)">{{ problemType.name }}</md-option>
                    </md-select>
                </md-field>
                
            </div>
            <div class="col-sm-4">
                
                <md-field>
                    <label for="claimer_сity">Проблема</label>
                    <md-select name="claimer_сity" id="claimer_сity">
                        <md-option v-for="(problem, index) in problems" @click="chooseProblem(problem)" :key="index" :value="problem.id">{{ problem.name }}</md-option>
                    </md-select>
                </md-field>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ProblemCollection from '../../../../domain/collections/functional/ProblemCollection';
    import IProblem from '../../../../domain/entities/functional/interfaces/IProblem';
    import IProblemType from '../../../../domain/entities/functional/interfaces/IProblemType';
    import ProblemType from '../../../../domain/entities/functional/ProblemType';

    @Component
    export default class ClaimProblems extends Vue {

        @Action('getAllProblemTypes')
        public getAllProblemTypes;

        @State('problemType') public problemTypeState;
        @State('claim') public claimState;
        @Provide() public problems = new ProblemCollection([{}]);
        @Provide() public problemType: IProblemType = new ProblemType(0, 'Выберите тип проблемы', '');

        public created() {
            this.getAllProblemTypes();
        }

        public chooseProblemType(problemType) {
            this.problemType.name = problemType.name;
            this.problems = problemType.problems;
        }

        public chooseProblem(problem: IProblem) {
            this.claimState.claim.problem = problem;
        }

    }
</script>

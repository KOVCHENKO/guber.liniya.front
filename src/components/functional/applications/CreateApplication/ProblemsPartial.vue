<template>
        <div class="row">
            <div class="col-sm-3 clearfix">
                <label class="input-title">{{ $t("claims.problem_types") }}:</label>
            </div>
            <div class="col-sm-4 clearfix">
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {{ problemType.name }}
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li v-for="problemType in problemTypeState.problemTypes" @click="chooseProblemType(problemType)">
                            <a href="javascript:void(0);">{{ problemType.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-5 clearfix">
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="claim_sub_type" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {{ claimState.claim.problem.name }}
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li v-for="problem in problems" @click="chooseProblem(problem)">
                            <a href="javascript:void(0);">{{ problem.name }}</a>
                        </li>
                    </ul>
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

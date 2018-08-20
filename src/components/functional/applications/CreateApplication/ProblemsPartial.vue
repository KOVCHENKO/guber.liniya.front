<template>
    <div>
        <div class="row">
            <div class="col-sm-4">
                
                <md-field>
                    <label>Тип проблемы</label>
                    <md-select name="type_problem" id="type_problem" v-model="problemTypeId">
                        <md-option v-for="(problemType, index) in problemTypeState.problemTypes" :key="index" :value="problemType.id">
                            {{ problemType.name }}
                        </md-option>
                    </md-select>
                </md-field>
                
            </div>
            <div class="col-sm-4">
                
                <md-field>
                    <label>Проблема</label>
                    <md-select name="claimer_сity" id="claimer_сity">
                        <md-option v-for="(problem, index) in problems" @click="chooseProblem(problem)" :key="index" :value="problem.id">{{ problem.name }}</md-option>
                    </md-select>
                </md-field>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import IProblem from '../../../../domain/entities/functional/interfaces/IProblem';

    @Component
    export default class ClaimProblems extends Vue {

        @Action('getAllProblemTypes')
        public getAllProblemTypes;

        @State('problemType') public problemTypeState;
        @State('claim') public claimState;
        @Provide() public problems = [];
        @Provide() public problemTypeId: number = 0;

        @Watch('problemTypeId')
        private onChildChanged(val: string, oldVal: string) {
            this.chooseProblemTypeById(val);
        }

        private created() {
            this.getAllProblemTypes();
        }

        /**
         * Получить индекс problemType по ид, а затем список проблем для создания
         * @param problemTypeId
         */
        private chooseProblemTypeById(problemTypeId) {
            const problemTypeIndex = this.problemTypeState.problemTypes.map((e) => {
                return e.id;
            }).indexOf(parseInt(problemTypeId, 10));

            this.problems = this.problemTypeState.problemTypes[problemTypeIndex].children;
        }

        private chooseProblem(problem: IProblem) {
            this.claimState.claim.problem = problem;
        }

    }
</script>

<template>
    <div>
        <div class="row" v-if="hiddenBasedOnClaimPid" >
            <div class="col-sm-4">
                <label for="type_problem">Тип проблемы</label>
                <select class="form-control" name="type_problem" id="type_problem" v-model="problemTypeId">
                    <option v-for="(problemType, index) in problemTypeState.problemTypes" :key="index" :value="problemType.id" @click="chooseProblemTypeById(problemType.id)">
                        {{ problemType.name }}
                    </option>
                </select>
            </div>

            <div class="col-sm-4">
                <label for="problem">Проблема</label>
                <select class="form-control" name="problem" id="problem" v-model="problemId">
                    <option v-for="(problem, index) in problems" :key="index" :value="problem.id">
                        {{ problem.name }}
                    </option>
                </select>
            </div>

            <div class="col-sm-4">
                <label for="problem">Организации</label>
                <ul class="list-group cst-list-group" v-if="dropDownOrganizationsClass">
                    <li class="list-group-item" v-for="organization in problemState.organizations" :key="organization.id">{{ organization.name }}</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import IProblem from '@/domain/entities/functional/interfaces/IProblem';

    @Component
    export default class ClaimProblems extends Vue {

        @Action public getAllProblemTypes;
        @Action public getOrganizationsOfProblem;

        @State('problemType') public problemTypeState;
        @State('claim') public claimState;
        @State('problem') public problemState;

        @Provide() public problems: IProblem[] = [];
        @Provide() public problemTypeId: number = 0;
        @Provide() public problemId: number = 0;

        // DropDown organizations
        @Provide() public dropDownOrganizationsClass = false;

        @Watch('problemTypeId')
        private onChildChanged(val: string, oldVal: string) {
            this.chooseProblemTypeById(val);
        }

        @Watch('problemId')
        private onProblemChange(val: string, oldVal: string) {
            this.chooseProblem(val);
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

        private chooseProblem(problemId) {
            const problemIndex = this.problems.map((e) => {
                return e.id;
            }).indexOf(parseInt(problemId, 10));

            this.claimState.claim.problem = this.problems[problemIndex];
            this.getOrganizationsOfProblem({ problemId });

            this.dropDownOrganizationsClass = true;
        }

        get hiddenBasedOnClaimPid() {
            return !this.claimState.claim.pid;
        }

    }
</script>

<template>
    <div>
        <div class="row" v-if="hiddenBasedOnClaimPid">
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
                    <md-select name="problem" id="problem" v-model="problemId">
                        <md-option v-for="(problem, index) in problems" :key="index" :value="problem.id">
                            {{ problem.name }}
                        </md-option>
                    </md-select>
                </md-field>
            </div>

            <div class="col-sm-4">
                <div class="dropdown" style="margin-top: 17px;">
                    <button class="btn btn-secondary dropdown-toggle cst-droplist" type="button" style="width: 100%"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="expandOrganizations">
                        Организации
                    </button>
                    <div class="dropdown-menu" :class="{show: dropDownOrganizationsClass}" aria-labelledby="dropdownMenuButton" style="width: 100%">
                        <p class="dropdown-item" v-for="organization in problemState.organizations" :key="organization.id">{{ organization.name }}</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-sm-4">
                <label>{{ claimState.claim.problem.name }}</label>
            </div>
            <div class="col-sm-4">
                <label>{{ claimState.claim.problem.description }}</label>
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

        @Action public getAllProblemTypes;
        @Action public getOrganizationsOfProblem;

        @State('problemType') public problemTypeState;
        @State('claim') public claimState;
        @State('problem') public problemState;

        @Provide() public problems: IProblem[] = [];
        @Provide() public problemTypeId: number = 0;
        @Provide() public problemId: number = 0;

        // DropDown organizations
        @Provide() public expandOrganizations = false;
        @Provide() public dropDownOrganizationsClass = false;

        @Watch('problemTypeId')
        private onChildChanged(val: string, oldVal: string) {
            this.chooseProblemTypeById(val);
        }

        @Watch('problemId')
        private onProblemChange(val: string, oldVal: string) {
            this.chooseProblem(val);
            // this.expandOrganizations = true;
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

            this.expandOrganizations = true;
            this.dropDownOrganizationsClass = true;
        }

        get hiddenBasedOnClaimPid() {
            return !this.claimState.claim.pid;
        }

    }
</script>

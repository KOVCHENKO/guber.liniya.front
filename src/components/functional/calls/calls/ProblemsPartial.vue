<style scope>
    .md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default {
        width: auto !important;
        max-width: none !important;
        min-width: 280px;
    }
</style>
<template>
    <div>
        <div class="row" v-if="hiddenBasedOnClaimPid" >
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
                <p class="cst-title" style="margin: 0px;">Организации</p>
                <md-content class="md-scrollbar org-scrollbar">
                    <ul v-if="dropDownOrganizationsClass" style="margin: 0px;">
                        <li v-for="organization in problemState.organizations" :key="organization.id"><span style="color: rgba(0,0,0,0.54);"> &mdash; </span>{{ organization.name }}</li>
                    </ul>
                </md-content>
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

<template>
    <div>
        <span v-for="problem in problemTypeState.problemType.problems" :key="problem.id">
            <button class="cabinet-item"
                    @click="showProblem(problem)">
                    <img :src="'/images/cabinets/analytics.png'"/>
                    <label class="cabinet-title">{{ problem.name }}</label>
            </button>
        </span>
        <create-problem></create-problem>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import {headings, plusButton} from '../../../domain/util/interface/CommonInterface';
    import IWithRouter from '../../../domain/util/interface/IWithRoute';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    import CreateProblem from '@/components/functional/problems/SingleProblemType/CreateProblem.vue';


    @Component({
        components: {CreateProblem},
    })
    export default class SingleProblemType extends Vue implements IWithRouter {

        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @Action('getSingleProblemType')
        public getSingleProblemType;

        constructor() {
            super();
            plusButton.visible = false;
            plusButton.title = 'Добавить проблему';
            plusButton.clickAction = this.createProblem;
            headings.title = 'Тип проблемы';
        }

        public created() {
            this.dispatchSingleProblemType();
        }

        public createProblem() {
            $('#createProblemModal').modal('show');
        }

        public showProblem() {
            // Показать проблему
        }

        public dispatchSingleProblemType() {
            // noinspection TypeScriptUnresolvedVariable
            this.getSingleProblemType({ id: this.$route.params.id }).then(() => {
                headings.subtitle = this.problemTypeState.problemType.name;
            });
        }

    }
</script>

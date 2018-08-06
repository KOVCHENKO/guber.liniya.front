<template>
    <div>
        <span v-for="problemType in problemTypeState.problemTypes.problemTypes" :key="problemType.id">
            <button class="cabinet-item"
                    @click="showProblemType(problemType)">
                    <img :src="'/images/cabinets/analytics.png'"/>
                    <label class="cabinet-title">{{ problemType.name }}</label>
            </button>
        </span>

        <create-problem-type></create-problem-type>
    </div>
</template>

<script lang="ts">
    import {plusButton, headings} from '../../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ProblemTypeState from '../../../store/functional/problemType/types';
    import CabinetState from '../../../store/common/cabinet/types';
    import CreateProblemType from '@/components/functional/problems/AllProblemTypes/CreateProblemType.vue';

    @Component({
        components: {CreateProblemType},
    })
    export default class ProblemTypes extends Vue {

        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @State('cabinet')
        public cabinetState!: CabinetState;

        @Action('getAllProblemTypes')
        public getProblemTypes;

        constructor() {
            super();
            this.getProblemTypes();

            plusButton.title = 'Проблемы';
            plusButton.disabled = false;
            plusButton.clickAction = this.createProblemType;
            headings.title = 'Все типы проблем';
            headings.subtitle = 'Выберите проблему';
        }

        public showProblemType(problem) {
            this.$router.push({ name: 'single_problem', params: { id: problem.id }});
        }

        public createProblemType() {
            $('#createProblemTypeModal').modal('show');
        }

    }
</script>

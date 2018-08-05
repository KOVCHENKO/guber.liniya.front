<template>
    <div>
        <span v-for="problem in problemTypeState.problemTypes" :key="problem.id">
            <button class="cabinet-item"
                    @click="showProblemType(problem)">
                    <img :src="'/images/cabinets/analytics.png'"/>
                    <label class="cabinet-title">{{ problem.name }}</label>
            </button>
        </span>
        <create-problem-type></create-problem-type>
    </div>
</template>

<script lang="ts">
    import {plusButton} from '../../../domain/util/interface/CommonInterface';
    import {Component, Vue} from 'vue-property-decorator';
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
        }

        public showProblemType(problem) {
            // router push to single problem
        }

        public createProblemType() {
            $('#createProblemTypeModal').modal('show');
            // Modal Window for creating problemTYpe
        }

    }
</script>

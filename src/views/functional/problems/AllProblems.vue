<template>
    <div>
        <span v-for="problem in problemTypeState.problemTypes" :key="problem.id">
            <button class="cabinet-item"
                    @click="showProblemType(problem)">
                    <img :src="'/images/cabinets/analytics.png'"/>
                    <label class="cabinet-title">{{ problem.name }}</label>
            </button>
        </span>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ProblemTypeState from '../../../store/functional/problemType/types';

    @Component
    export default class Problems extends Vue {

        @State('problemType')
        public problemTypeState!: ProblemTypeState;

        @Action('getAllProblemTypes')
        public getProblemTypes;

        constructor() {
            super();
            this.getProblemTypes();
        }

        public showProblemType(problem) {
            // router push to single problem
        }

    }
</script>

<template>
    <div>
        Одиночный тип проблемы
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action} from 'vuex-class';
    import {plusButton} from '../../../domain/util/interface/CommonInterface';
    import IWithRouter from '../../../domain/util/interface/IWithRoute';

    @Component
    export default class SingleProblemType extends Vue implements IWithRouter {

        @Action('getSingleProblemType')
        public getSingleProblemType;

        constructor() {
            super();
            plusButton.disabled = true;
        }

        public created() {
            this.getSingleProblemType({ id: this.$route.params.id });
        }

    }
</script>

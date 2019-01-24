<template>
    <div>Something</div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {headings, plusButton} from '@/domain/util/interface/CommonInterface';

    @Component
    export default class AllRoles extends Vue {


        constructor() {
            super();
            plusButton.title = 'Роли';
            plusButton.visible = true;
            // plusButton.clickAction = this.createProblemType;
            headings.title = 'Все роли';
            // this.getProblemTypes();
        }

    }
</script>

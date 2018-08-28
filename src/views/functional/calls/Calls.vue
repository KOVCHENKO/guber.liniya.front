<template>
    <div>
        Звонки
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action} from 'vuex-class';

    @Component
    export default class Calls extends Vue {

        @Action public getCalls;

        constructor() {
            super();
            this.getCalls();
        }
    }
</script>

<style scoped>

</style>
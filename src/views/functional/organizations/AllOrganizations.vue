<template>
    <div>Все организации</div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class AllOrganizations extends Vue {
        public showSomething() {
            // Double inheritance is not working here
        }

    }
</script>

<style scoped>

</style>
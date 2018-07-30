<template>
    <div>Организации специалиста</div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class SpecialistOrganizations extends Vue {

        public showSomething(): void {
            // show something is here
        }

        protected created() {
            this.showSomething();
        }
    }
</script>

<style scoped>

</style>
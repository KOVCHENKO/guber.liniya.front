<template>
    <div>
        <datatable-customized
                :columns="tableColumns"
                :data="organizationState.organizations"
        ></datatable-customized>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../store/functional/organization/types';

    @Component({
        components: {DatatableCustomized},
    })
    export default class AllOrganizations extends Vue {

        @Provide()
        public tableColumns = [
            {label: 'id', field: 'id'},
            {label: 'Наименование', field: 'name'},
            {label: 'Описание', field: 'description'},
        ];

        @State('organization')
        public organizationState!: OrganizationState;

        @Action('getAllOrganizations')
        public getAllOrganizations;

        public created() {
            this.getAllOrganizations();
        }

        public showSomething() {
            // Double inheritance is not working here
        }

    }
</script>

<style scoped>

</style>
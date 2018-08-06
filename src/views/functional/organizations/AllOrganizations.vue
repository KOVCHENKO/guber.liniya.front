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
    import CabinetState from '../../../store/common/cabinet/types';
    import {plusButton, headings} from '../../../domain/util/interface/CommonInterface';

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

        @State('cabinet')
        public cabinetState!: CabinetState;

        @State('organization')
        public organizationState!: OrganizationState;

        @Action('getAllOrganizations')
        public getAllOrganizations;


        constructor() {
            super();
            this.getAllOrganizations();
            plusButton.title = 'Организации';
            plusButton.disabled = true;
            headings.title = 'Все организации';
            headings.subtitle = '';
        }

    }
</script>

<style scoped>

</style>
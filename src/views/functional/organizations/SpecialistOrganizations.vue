<template>
    <div>

        <div class="heading-page">
            <h2 class="caption-text-center">Подчиненные организации</h2>
            <div class="divider"></div>
        </div>

        <div class="main-page">
            <datatable-customized
                    :columns="tableColumns"
                    :data="organizationState.organizations"
            ></datatable-customized>
        </div>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import {Action, State} from 'vuex-class';
    import UserState from '../../../store/common/user/types';
    import OrganizationState from '../../../store/functional/organization/types';

    @Component({
        components: {
            DatatableCustomized,
        },
    })
    export default class SpecialistOrganizations extends Vue {

        @Provide()
        public tableColumns = [
            {label: 'id', field: 'id'},
            {label: 'Название', field: 'name'},
            {label: 'Описание', field: 'description'},
        ];

        @State('organization')
        public organizationState!: OrganizationState;

        @State('user')
        public userState!: UserState;

        @Action('getAllChildrenOrganization')
        public getAllChildrenOrganization;

        public created() {
            this.getAllChildrenOrganization({organization_id : this.userState.user.organization.id });
        }

    }
</script>

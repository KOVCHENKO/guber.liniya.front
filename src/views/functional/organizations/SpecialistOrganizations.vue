<template>
    <div>
        
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
    import {headings, plusButton} from '../../../domain/util/interface/CommonInterface';

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

        constructor() {
            super();
            plusButton.visible = false;
            headings.title = 'Подчиненные организации';
        }

        public created() {
            this.getAllChildrenOrganization({organization_id : this.userState.user.organization.id });
        }

    }
</script>

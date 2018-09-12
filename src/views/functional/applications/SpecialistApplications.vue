<template>
    <div>
        
        <div class="main-page">
 
            <datatable :columns="tableColumns" :data="organizationState.claims">
                <template slot-scope="{ row }">
                    <tr>
                        <td>
                            {{ row.id }}
                            <div class="container-icon">
                                <i class="fas fa-exclamation fa-3x" v-if="row.status === 'created'" title="новая заявка" style="color: #fffa31;"></i>
                            </div>
                        </td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.description }}</td>                        
                        <td>{{ row.firstname}} {{row.middlename}} {{row.lastname}}</td>
                        <td>
                            <div @click="show(row)" class="container-icon">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                            <div class="container-icon">
                                <i class="fas fa-bookmark fa-2x" v-if="row.status === 'created'" style="color: dimgrey;"  title="новая заявка"></i>
                                <i class="fas fa-bookmark fa-2x" v-if="row.status === 'assigned'" style="color: #9dbcf5;" title="заявка в работе"></i>
                                <i class="fas fa-bookmark fa-2x" v-if="row.status === 'executed'" style="color: #fffa31;" title="выполненая заявка"></i>
                            </div>
                        </td>
                    </tr>
                </template>
            </datatable>

        </div>

        <update-status-claims :claim="claim"></update-status-claims>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../store/functional/organization/types';
    import {headings, statusDialog, plusButton} from '../../../domain/util/interface/CommonInterface';
    import UserState from '../../../store/common/user/types';
    import UpdateStatusClaims from '@/components/functional/claims/UpdateStatusClaims.vue';

    @Component({
        components: {
            UpdateStatusClaims,
        },
    })
    export default class SpecialistApplications extends Vue {

        @State('organization')
        public organizationState!: OrganizationState;

        @State('user')
        public userState!: UserState;

        @Action('getAllClaimsOfOrganization')
        public getAllClaimsOfOrganization;

        @Action('getAllChildrenOrganization')
        public getAllChildrenOrganization;

        @Provide()
        public tableColumns = [
            {label: 'id', field: 'id'},
            {label: 'Наименование', field: 'name'},
            {label: 'Описание', field: 'description'},
            {label: 'Заявитель', representedAs: (row) => {
                    return `${row.firstname} ${row.middlename } ${row.lastname}`;
                }, interpolate: true},
            {label: ''},
        ];

        @Provide()
        public claim: {} = {
            name: '',
            description: '',
            firstname: '',
            middlename: '',
            lastname: '',
            phone: '',
            status: '',
        };

        constructor() {
            super();
            headings.title = 'Все заявки';
            statusDialog.show = false;
            plusButton.visible = false;
        }

        public created() {
            this.getAllClaimsOfOrganization({organization_id : this.userState.user.organization.id });
            this.getAllChildrenOrganization({organization_id : this.userState.user.organization.id });
        }

        public show(row) {
            this.claim = row;
            statusDialog.show = true;
        }

    }
</script>
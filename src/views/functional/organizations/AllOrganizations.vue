<!--suppress TypeScriptCheckImport -->
<template>
    <div>
        <p @click="newOrganization(0)">Добавить новую организацию</p>
        <v-jstree
                :data="organizationState.organizationTree"
                allow-batch
                whole-row
                allow-transition
                size="large">
            <template slot-scope="_">
                <div style="display: inherit; width: 10px">
                    <i :class="_.vm.themeIconClasses" role="presentation" v-if="!_.model.loading"></i>
                    {{ _.model.text }}
                    &nbsp
                    <button @click="showProblems(_.model)" class="template-tree">
                        <i>Проблемы</i>
                    </button>
                    &nbsp
                    <button @click="showUsers(_.model)" class="template-tree">
                        <i>Аккаунты</i>
                    </button>
                    &nbsp&nbsp
                    <i @click="newOrganization(_.model.id)" class="fa fa-plus"></i>&nbsp
                    <i @click="editOrganization(_.model.id)" class="fas fa-pencil-alt"></i>&nbsp
                    <i @click="dispatchOrganizationDelete(_.model.id)" class="fas fa-trash-alt"></i>
                </div>
            </template>
        </v-jstree>

        <create-organization></create-organization>
        <update-organization></update-organization>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../store/functional/organization/types';
    import {plusButton, headings} from '../../../domain/util/interface/CommonInterface';
    import CreateOrganization from '@/components/functional/organizations/AllOrganizations/CreateOrganization.vue';
    import UpdateOrganization from '@/components/functional/organizations/AllOrganizations/UpdateOrganization.vue';
    import VJstree from 'vue-jstree';
    import Organization from '../../../domain/entities/functional/Organization';

    @Component({
        components: {VJstree, CreateOrganization, UpdateOrganization},
    })
    export default class AllOrganizations extends Vue {
        @State('organization')
        public organizationState!: OrganizationState;

        @Action('getAllOrganizations')
        public getAllOrganizations;

        @Action('getOrganization')
        public getOrganization;

        @Action('deleteOrganization')
        public deleteOrganization;

        constructor() {
            super();
            plusButton.title = 'Организации';
            plusButton.disabled = true;
            headings.title = 'Все организации';
            headings.subtitle = '';
        }

        public created() {
            this.getAllOrganizations();
        }

        public showProblems(organization) {
            this.$router.push({ name: 'single_organization_problems', params: { id: organization.id }});
        }

        public showUsers(organization) {
            this.$router.push({ name: 'single_organization_users', params: { id: organization.id }});
        }

        public newOrganization(pid) {
            this.organizationState.organization = new Organization(0, '', '', pid);
            $('#createOrganizationModal').modal('show');
        }

        public async editOrganization(id) {
            await this.getOrganization({id});
            $('#updateOrganizationModal').modal('show');
        }

        public dispatchOrganizationDelete(id) {
            this.organizationState.organization.id = id;
            this.deleteOrganization();
        }

    }
</script>

<style scoped>
    .template-tree {
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
</style>
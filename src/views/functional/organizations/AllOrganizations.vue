<template>
    <div>
        <p @click="newOrganization(0)">Добавить новую организацию</p>
        <v-jstree
                :data="organizationState.organizationTree"
                multiple
                allow-batch
                whole-row
                allow-transition
                size="large">
            <template slot-scope="_">
                <div style="display: inherit; width: 10px">
                    <i :class="_.vm.themeIconClasses" role="presentation" v-if="!_.model.loading"></i>
                    {{ _.model.text }}
                    <button @click="showOrganization(_.model)" style="border: 0px; background-color: transparent; cursor: pointer;">
                        <i class="fa fa-remove">Посмотреть</i>
                    </button>
                    <button @click="newOrganization(_.model.id)" style="border: 0px; background-color: transparent; cursor: pointer;">
                        <i class="fa fa-remove">Добавить</i>
                    </button>
                    <button @click="editOrganization(_.model.id)" style="border: 0px; background-color: transparent; cursor: pointer;">
                        <i class="fa fa-remove">Редактировать</i>
                    </button>
                    <button @click="dispatchOrganizationDelete(_.model.id)" style="border: 0px; background-color: transparent; cursor: pointer;">
                        <i class="fa fa-remove">Удалить</i>
                    </button>
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
    // noinspection TypeScriptCheckImport
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

        public showOrganization(organization) {
            this.$router.push({ name: 'single_organization', params: { id: organization.id }});
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

</style>
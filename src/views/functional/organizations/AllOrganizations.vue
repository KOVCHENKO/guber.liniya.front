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
                    <button @click="deleteOrganization(_.model.id)" style="border: 0px; background-color: transparent; cursor: pointer;">
                        <i class="fa fa-remove">Удалить</i>
                    </button>
                </div>
            </template>
        </v-jstree>

        <create-organization></create-organization>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../store/functional/organization/types';
    import {plusButton, headings} from '../../../domain/util/interface/CommonInterface';
    import CreateOrganization from '@/components/functional/organizations/AllOrganizations/CreateOrganization.vue';
    // noinspection TypeScriptCheckImport
    import VJstree from 'vue-jstree';


    @Component({
        components: {VJstree, CreateOrganization},
    })
    export default class AllOrganizations extends Vue {
        @State('organization')
        public organizationState!: OrganizationState;

        @Action('getAllOrganizations')
        public getAllOrganizations;

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
            // console.log(pid);
        }

        public editOrganization(pid) {
            // console.log(pid);
        }

        public deleteOrganization(pid) {
            $('#createOrganizationModal').modal('show');
            // console.log(pid);
        }

    }
</script>

<style scoped>

</style>
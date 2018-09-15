<template>
    <div>
        <!-- Модальное окно - подтверждение действия -->
        <div class="modal fade" id="reassignToAnotherOrganization" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content cst-md-content">
                    <div class="modal-header">
                        <h4 class="modal-title cst-md-title">Организации</h4>
                    </div>
                    <div class="modal-body">
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
                                    <span @click="reassign(_.model)" class="template-tree">
                                        <i>Назначить</i>
                                    </span>
                                </div>
                            </template>
                        </v-jstree>
                    </div>
                </div>
            </div>
        </div>
        <!--End of modal-->
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../../store/functional/organization/types';
    // noinspection TypeScriptCheckImport
    import VJstree from 'vue-jstree';

    @Component({
        components: {VJstree},
    })
    export default class ReassignToAnotherOrganization extends Vue {
        @State('organization')
        public organizationState!: OrganizationState;

        @Action('getAllOrganizations') public getAllOrganizations;
        @Action public reassignRejectedClaim;

        public created() {
            this.getAllOrganizations();
        }

        /**
         * Переназначить заявку другой организации
         * @param organization
         */
        public reassign(organization) {
            this.reassignRejectedClaim({ organizationId: organization.id, status: 'created'}).then(() => {
                $('#reassignToAnotherOrganization').modal('hide');
            });
        }
    }
</script>

<template>
    <div>
        <!-- Modal - create organization -->
        <div class="modal fade" id="createOrganizationModal" tabindex="-1" role="dialog"
             aria-labelledby="createOrganizationModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="createOrganizationModalLabel">{{ $t("organization.create_modal_name") }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="problem_type_name" class="input-title">{{ $t("organization.organization_name") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <input id="problem_type_name" type="text" :name="$t('validation.name')" :placeholder="$t('organization.organization_name')"
                                       v-model="organizationState.organization.name"
                                       v-validate="'required|max:255'">
                            </div>
                            <span class="validation-error" v-show="errors.has($t('validation.name'))">
                                {{ errors.first($t('validation.name')) }}
                            </span>
                        </div>
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="problem_type_description" class="input-title">{{ $t("organization.organization_description") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <textarea id="problem_type_description" :name="$t('validation.description')" :placeholder="$t('organization.organization_description')"
                                          v-model="organizationState.organization.description"
                                          v-validate="'required'">
                                </textarea>
                            </div>
                            <span class="validation-error">
                                {{ errors.first($t('validation.description')) }}
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="createOrganization"
                                :disabled="checkCreateButtonDisability([organizationState.organization.description, organizationState.organization.name])">
                                {{ $t("common.save") }}
                        </button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{ $t("common.close") }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end of modal -->
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../../store/functional/organization/types';
    import {checkButtonDisability} from '../../../../domain/util/interface/ButtonDisability';

    @Component
    export default class CreateOrganization extends Vue {
        @State('organization')
        public organizationState!: OrganizationState;

        @Action('createOrganization')
        public createOrganization;

        @Provide()
        protected checkCreateButtonDisability = checkButtonDisability;


    }
</script>

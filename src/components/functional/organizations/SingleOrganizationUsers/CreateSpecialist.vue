<template>
    <div>
        <!-- Modal - create problem type -->
        <div class="modal fade" id="createSpecialistModal" tabindex="-1" role="dialog"
             aria-labelledby="createSpecialistModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="createSpecialistModalLabel">{{ $t("specialist.create_specialist_modal") }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="specialist_login" class="input-title">{{ $t("specialist.login") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <input id="specialist_login" type="text" :name="$t('validation.login')" :placeholder="$t('specialist.login')"
                                       v-model="userState.user.email"
                                       v-validate="'required|max:255'" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="specialist_password" class="input-title">{{ $t("specialist.password") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <input id="specialist_password" type="text" :name="$t('validation.password')" :placeholder="$t('specialist.password')"
                                       v-model="userState.user.password"
                                       v-validate="'required|max:255'" />
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="createSpecialist">{{ $t("common.save") }}</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{ $t("common.close") }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end of modal -->
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import UserState from '../../../../store/common/user/types';
    import IWithRoute from '@/domain/util/interface/IWithRoute';

    @Component
    export default class CreateSpecialist extends Vue implements IWithRoute {

        @State('user')
        public userState!: UserState;

        @Action('addSpecialist')
        public addSpecialist;

        protected createSpecialist() {
            // noinspection TypeScriptUnresolvedVariable
            this.addSpecialist({ organization_id: this.$route.params.id });
        }

    }
</script>

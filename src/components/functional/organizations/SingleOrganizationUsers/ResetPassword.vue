<template>
    <div>
        <!-- Modal - create problem type -->
        <div class="modal fade" id="resetSpecialistPasswordModal" tabindex="-1" role="dialog"
             aria-labelledby="resetSpecialistPasswordModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="resetSpecialistPasswordModalLabel">{{ $t("specialist.reset_password_modal") }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="specialist_login" class="input-title">{{ $t("specialist.password") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <input id="specialist_login" type="text" :name="$t('validation.password')" :placeholder="$t('specialist.password')"
                                       v-model="password"
                                       v-validate="'required|max:255'" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="specialist_password" class="input-title">{{ $t("specialist.repassword") }}</label>
                            </div>
                            <div class="col-sm-8 clearfix">
                                <input id="specialist_password" type="text" :name="$t('validation.password')" :placeholder="$t('specialist.password')"
                                       v-model="repassword"
                                       v-validate="'required|max:255'" />
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="resetPassword">Сбросить</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{ $t("common.close") }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end of modal -->
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from "vue-property-decorator";
    import {Action, State} from 'vuex-class';
    import UserState from '../../../../store/common/user/types';
    import IWithRoute from '@/domain/util/interface/IWithRoute';

    @Component
    export default class CreateSpecialist extends Vue implements IWithRoute {
        @Provide public password;
        @Provide public repassword;

        public resetPassword() {
            // reset password method
        }

    }
</script>

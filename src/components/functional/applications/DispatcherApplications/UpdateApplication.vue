<template>
    <!-- Диалоговое окно-->
    <md-dialog :md-active.sync="statusDialog.show" class="customer-dialog update-app">
        <md-dialog-title>Информаци по заявке</md-dialog-title>
        <md-tabs md-sync-route>
            <md-tab id="tab-applicant" md-label="Данные заявителя">
                <div class="form-padding">
                    <div class="row">
                        <div class="col-sm-4">
                            <md-field>
                                <label for="claimer_lastname">{{$t('claims.claimer_lastname')}}</label>
                                <md-input :name="$t('validation.lastname')" id="claimer_lastname" v-model="claimState.claim.lastName" :disabled="disabledBasedOnDispatchStatus"/>
                            </md-field>
                        </div>
                        <div class="col-sm-4">
                            <md-field>
                                <label for="claimer_info">{{$t('claims.claimer_firstname')}}</label>
                                <md-input :name="$t('validation.firstname')" id="claimer_info" v-model="claimState.claim.firstName" :disabled="disabledBasedOnDispatchStatus"/>
                            </md-field>
                        </div>
                        <div class="col-sm-4">
                            <md-field>
                                <label for="claimer_middlename">{{$t('claims.claimer_middlename')}}</label>
                                <md-input :name="$t('validation.middlename')" id="claimer_middlename" v-model="claimState.claim.middleName" :disabled="disabledBasedOnDispatchStatus"/>
                            </md-field>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">
                            <md-field>
                                <label>Район</label>
                                <md-select name="сity" id="claimer_сity" v-model="claimState.claim.address.district" :disabled="disabledBasedOnDispatchStatus">
                                    <md-option v-for="(district, index) in districts" :key="index" :value="district">{{ district }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="col-sm-8">
                            <md-field>
                                <label for="claim_address">{{$t('claims.claimer_address')}}</label>
                                <md-input :name="$t('validation.address')" id="claim_address" v-model="claimState.claim.address.location" :disabled="disabledBasedOnDispatchStatus"/>
                            </md-field>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <md-field>
                                <label for="claimer_phone">{{$t('claims.claimer_phone')}}</label>
                                <md-input :name="$t('validation.phone')" id="claimer_phone" v-model="claimState.claim.phone" :disabled="disabledBasedOnDispatchStatus"/>
                            </md-field>
                        </div>
                        <div class="col-sm-6">
                            <md-field>
                                <label for="claimer_email">{{$t('claims.claimer_email')}}</label>
                                <md-input :name="$t('validation.email')" id="claimer_email" v-model="claimState.claim.email" :disabled="disabledBasedOnDispatchStatus"/>
                            </md-field>
                        </div>
                    </div>

                </div>
            </md-tab>

            <md-tab id="tab-info" md-label="Информация">
                <div class="form-padding">
                    <!--<hr class="transparent-line">-->
                    <div class="row">
                        <div class="col-sm-12 clearfix">
                            <audio style="width: 100%;" controls>
                                <source :src="claimState.claim.link" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>

                    <div class="row" style="margin-top: 40px;">
                        <div class="col-sm-6" style="padding-left: 17px;">
                            <label>{{ claimState.claim.problem.name }}</label>
                        </div>
                        <div class="col-sm-6" v-if="claimState.responsibleOrganizations == ''">
                            <label>Информация отсутствует</label>
                        </div>
                        <div class="col-sm-6" v-else>
                            <label v-for="respOrg in claimState.responsibleOrganizations">{{ respOrg.name }}</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12 clearfix">

                            <md-field>
                                <label>{{$t('claims.claim_description')}}</label>
                                <md-textarea id="claim_description" name="description" style="height: 75px; min-height: auto !important;" class="textarea-resize-none"
                                             v-model="claimState.claim.description" md-counter="300" :disabled="disabledBasedOnDispatchStatus"></md-textarea>
                            </md-field>

                        </div>
                    </div>
                </div>
            </md-tab>
            <md-tab id="tab-linked" md-label="Связанные заявки">
                <md-content class="container md-scrollbar update-app-scrollbar">
                    <div class="row" v-if="claimState.claim.parents !== null" v-for="parentClaim in claimState.claim.parents">
                        <div class="col-sm-3 clearfix" style="line-height: 58px;">
                            {{ parentClaim.created_at }}
                        </div>
                        <div class="col-sm-9 clearfix">
                            <audio style="margin-top: 58px; width: 100%;" controls>
                                <source :src="parentClaim.link" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>
                    <div class="row" v-if="claimState.claim.parents.length === 0">
                        <div class="col-sm-6 clearfix">
                            История по заявке отсутсвует
                        </div>
                    </div>
                </md-content>
            </md-tab>

            <md-tab id="tab-comments" md-label="Комментарии">
                <md-content class="container md-scrollbar update-app-comments-scrollbar">
                    <div class="row" v-if="claimState.claim.comments !== null" v-for="comment in claimState.claim.comments">
                        <div class="col-sm-12 clearfix" style="padding: 10px; border-bottom: 1px solid #d2d2d2;">
                            {{ comment.text }}
                        </div>
                    </div>
                    <div class="row" v-if="claimState.claim.comments.length === 0">
                        <div class="col-sm-12 clearfix">
                            Комментарии к заявке отсутствуют
                        </div>
                    </div>
                </md-content>
            </md-tab>

            <md-tab id="tab-files" md-label="Файлы">
                <md-content class="container md-scrollbar update-app-comments-scrollbar">
                    <div class="row" v-if="claimState.confirmationFiles !== null" v-for="file in claimState.confirmationFiles">
                        <div class="col-sm-12 clearfix">
                            <a :href="baseRootUrl + file.path" download>Скачать</a>
                        </div>
                    </div>
                    <div class="row" v-if="claimState.confirmationFiles.length === 0">
                        <div class="col-sm-12 clearfix">
                            Подтверждаюшие файлы отсутствуют
                        </div>
                    </div>
                </md-content>
            </md-tab>
        </md-tabs>

        <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog">{{ $t("common.close") }}</md-button>
            <!--<md-button class="md-primary" @click="pushUpdate" :disabled="disabledBasedOnDispatchStatus">{{ $t("common.update") }}</md-button>-->
            <md-button class="md-primary" @click="pushUpdate" :disabled="disabledBasedOnDispatchStatus">{{ sendUpdateButton }}</md-button>
        </md-dialog-actions>

    </md-dialog>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import { districts } from '../../../../domain/entities/functional/Address';
    import { plusButton, statusDialog } from '../../../../domain/util/interface/CommonInterface';
    import IWithRoute from '../../../../domain/util/interface/IWithRoute';
    import UserState from '../../../../store/common/user/types';
    import RoleResolver from '../../../../domain/services/functional/roles/RoleResolver';
    import {baseRootUrl} from '@/globals';

    @Component
    export default class UpdateApplication extends Vue implements IWithRoute {
        @Action public updateClaim;

        @State('claim') public claimState!: ClaimState;
        @State('user') public userState!: UserState;

        @Provide() public baseRootUrl = baseRootUrl;

        @Provide() public districts: string[] = districts;
        @Provide() public showSingleClaimModal: boolean = false;
        @Provide() public active: string = 'first';
        @Provide() public first: boolean = true;
        @Provide() public second: boolean = false;
        @Provide() public statusDialog = statusDialog;

        public created() {
            statusDialog.show = false;
            plusButton.clickAction = () => statusDialog.show = true;
        }

        public setDone(id, index) {
            this[id] = true;

            if (index) {
                this.active = index;
            }
        }

        public closeDialog() {
            this.statusDialog.show = false;
            this.active = 'active';
            this.first = true;
            this.second = false;
        }

        public pushUpdate() {
            let resolvedRole;
            resolvedRole = RoleResolver.resolveRole(this.userState.role.name);
            this.updateClaim({ updatedDispatchStatus: resolvedRole.getDispatchStatusToUpdate() });

            if (this.userState.role.name === 'supervisor') {
                this.statusDialog.show = false;
            }
        }

        get disabledBasedOnDispatchStatus() {
            let resolvedRole;
            resolvedRole = RoleResolver.resolveRole(this.userState.role.name);
            return resolvedRole.dispatchStatusOfClaim(this.claimState.claim.dispatchStatus);
        }

        get sendUpdateButton() {
            if (this.userState.role.name === 'supervisor') {
                return 'Отправить';
            }

            return 'Обновить';
        }

    }
</script>

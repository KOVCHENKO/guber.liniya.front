<template>
    <!-- Диалоговое окно-->
    <md-dialog :md-active.sync="statusDialog.show" class="customer-dialog">
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

                    <div class="row">
                        <div class="col-sm-12 clearfix">
                            <audio controls>
                                <source :src="claimState.claim.link" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>

                    <br><br>

                    <div class="row">
                        <div class="col-sm-4">
                            <label>{{ claimState.claim.problem.name }}</label>
                        </div>
                        <div class="col-sm-4">
                            <label>{{ claimState.claim.problem.description }}</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12 clearfix">

                            <md-field>
                                <label>{{$t('claims.claim_description')}}</label>
                                <md-textarea id="claim_description" name="description" style="height: 75px; min-height: auto !important;"
                                             v-model="claimState.claim.description" md-counter="300" :disabled="disabledBasedOnDispatchStatus"></md-textarea>
                            </md-field>

                        </div>
                    </div>
                </div>
            </md-tab>
            <md-tab id="tab-linked" md-label="Связанные заявки">
                <div class="row" v-if="claimState.claim.parents !== null" v-for="parentClaim in claimState.claim.parents">
                    <div class="col-sm-2 clearfix">
                        {{ parentClaim.created_at }}
                    </div>
                    <div class="col-sm-10 clearfix">
                        <audio controls>
                            <source :src="parentClaim.link" type="audio/mpeg">
                        </audio>
                    </div>
                </div>
                <div class="row" v-if="claimState.claim.parents.length === 0">
                    <div class="col-sm-6 clearfix">
                        История по заявке отсутсвует
                    </div>
                </div>
            </md-tab>

            <md-tab id="tab-comments" md-label="Комментарии">
                <div class="row" v-if="claimState.claim.comments !== null" v-for="comment in claimState.claim.comments">
                    <div class="col-sm-6 clearfix">
                        {{ comment.text }}
                    </div>
                </div>
                <div class="row" v-if="claimState.claim.comments.length === 0">
                    <div class="col-sm-6 clearfix">
                        Комментарии к заявке отсутствуют
                    </div>
                </div>
            </md-tab>
        </md-tabs>

        <md-dialog-actions style="top: -30px;">
            <md-button class="md-primary" @click="closeDialog">{{ $t("common.close") }}</md-button>
            <md-button class="md-primary" @click="pushUpdate" :disabled="disabledBasedOnDispatchStatus">{{ $t("common.update") }}</md-button>
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

    @Component
    export default class UpdateApplication extends Vue implements IWithRoute {
        @Action public updateClaim;

        @State('claim') public claimState!: ClaimState;
        @State('user') public userState!: UserState;

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
        }

        get disabledBasedOnDispatchStatus() {
            let resolvedRole;
            resolvedRole = RoleResolver.resolveRole(this.userState.role.name);
            return resolvedRole.dispatchStatusOfClaim(this.claimState.claim.dispatchStatus);
        }

    }
</script>
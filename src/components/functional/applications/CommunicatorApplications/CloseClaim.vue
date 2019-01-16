<template>
    <md-dialog :md-active.sync="statusDialog.show" class="customer-dialog dialog-close-claim" style="width: 640px !important; max-height: 100%;">

        <md-dialog-title>Информация по заявке</md-dialog-title>
        <div class="dialog-line-shadow"></div>
        <div class="claim-container claim-content">
            <md-content class="md-scrollbar claim-scrollbar" style="max-height: 60px;">{{ claimState.claim.description }}</md-content>

            <md-content class="md-scrollbar claim-scrollbar" >
                <audio style="margin-top: 58px; width: 100%;" controls>
                    <source :src="claimState.claim.link" type="audio/mpeg">
                </audio>
            </md-content>

            <br>

            <div class="md-list-item-text">
                <span v-if="claimState.responsibleOrganizations == ''">Информация отсутсвует</span>
                <span v-else>{{ claimState.responsibleOrganizations[0].name }}</span>
                <span class="color-light-grey">Организация</span>
            </div>

            <md-content>
                <div class="row">
                    <div class="col-sm-4 padding-right">
                        <md-content class="claim-label">Активности по заявке:</md-content>
                    </div>
                    <div class="col-sm-1 padding-left"></div>
                    <div class="col-sm-7">
                        <div class="md-layout-item">
                            <md-field>
                                <label>Изменить статус</label>
                                <md-select name="status" id="claimer_status" v-model="statusData">
                                    <md-option value="not_executed">{{ statusClaims[0] }}</md-option>
                                    <md-option value="executed_partially">{{ statusClaims[1] }}</md-option>
                                    <md-option value="executed_totally">{{ statusClaims[2] }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </div>
                </div>
            </md-content>

            <md-content class="md-scrollbar claim-scrollbar" style="max-height: 60px;">
                <div class="md-list-item-text">
                    <span v-if="claimState.claim.comments.length == 0">Комментарий отсутсвует</span>
                    <span v-else v-for="comment in claimState.claim.comments">{{ comment.text }}</span>
                    <span class="color-light-grey">Комментарий</span>
                </div>
            </md-content>

        </div>
        <div class="dialog-line"></div>

        <div class="claim-container claim-content">
            <md-content class="claim-text" v-if="claimState.claim.firstName === '' && claimState.claim.middleName === '' && claimState.claim.lastName === ''">Нет данных</md-content>
            <md-content class="claim-text" v-else>{{ claimState.claim.firstName }} {{ claimState.claim.middleName }} {{ claimState.claim.lastName }}</md-content>
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <div class="md-list-item-text">
                        <span>{{ claimState.claim.phone }}</span>
                        <span class="color-light-grey">Телефон</span>
                    </div>
                </div>
                <div class="md-layout-item">
                    <div class="md-list-item-text">
                        <span>{{claimState.claim.email}}</span>
                        <span class="color-light-grey">E-mail</span>
                    </div>
                </div>
                <div class="md-layout-item">
                    <div class="md-list-item-text">
                        <span>{{claimState.claim.address.district}}, {{claimState.claim.address.location}}</span>
                        <span class="color-light-grey">Адрес</span>
                    </div>
                </div>
            </div>

        </div>

        <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog">{{ $t("common.close") }}</md-button>
            <md-button class="md-primary" @click="dispatchClose">{{ $t("common.update") }}</md-button>
        </md-dialog-actions>

    </md-dialog>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {statusDialog} from '../../../../domain/util/interface/CommonInterface';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import {
        EXECUTED_PARTIALLY, EXECUTED_TOTALLY, NOT_CALLED, NOT_EXECUTED,
    } from '../../../../domain/services/functional/claims/interfaces/closeStatusTypes';

    @Component
    export default class CloseClaim extends Vue {
        @Action('closeClaim')
        public closeClaim;

        @State('claim') public claimState!: ClaimState;

        @Provide() public statusDialog = statusDialog;
        @Provide()
        public statusClaims: any = [NOT_EXECUTED, EXECUTED_PARTIALLY, EXECUTED_TOTALLY];

        @Provide() public statusData: string = '';

        public closeDialog() {
            statusDialog.show = false;
        }

        /**
         * Изменить статус заявки
         */
        public dispatchClose() {
            this.closeClaim({
                claim_id: this.claimState.claim.id,
                close_status: this.statusData,
            });
        }





    }
</script>

<style scope>
    .dialog-close-claim .claim-content.claim-container {
        padding: 0 24px;
        margin-top: 2px;
        margin-bottom: 20px;
    }
</style>
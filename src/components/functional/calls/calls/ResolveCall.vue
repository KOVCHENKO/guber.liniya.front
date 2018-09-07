<template>
    <div>
        <!-- Диалоговое окно-->
        <md-dialog :md-active.sync="statusDialog.show" class="customer-dialog">
            <md-dialog-title>Создание заявки</md-dialog-title>
            <!-- Степпер-->
            <md-steppers :md-active-step.sync="active" md-linear>
                <md-step id="zero" md-label="Данные звонка" md-description="тип звонка" :md-done.sync="steps.zero">
                    <!-- Информация о пользователе-->
                    <div class="form-padding">
                        <div class="row">
                            <div class="col-sm-4-12 dialog-title">
                                <h5>Тип звонка</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="claimed">Заявка</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="radio" id="claimed" value="claimed" @click="chooseCallType('claimed')" v-model="callType">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="reclaimed">Повторная заявка</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="radio" id="reclaimed" value="reclaimed" @click="chooseCallType('reclaimed')" v-model="callType">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="failed">Ошибка</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="radio" id="failed" value="failed" @click="chooseCallType('failed')" v-model="callType">
                            </div>
                        </div>
                    </div>
                    <md-dialog-actions>
                        <md-button class="md-primary" @click="setDone('zero', 'first')">Продолжить</md-button>
                    </md-dialog-actions>
                </md-step>

                <!-- Шаг первый-->
                <md-step id="first" md-label="Заявитель" md-description="личные данные" :md-done.sync="steps.first">
                    <!-- Информация о пользователе-->
                    <div class="form-padding">
                        <div class="row">
                            <div class="col-sm-4-12 dialog-title">
                                <h5>Данные заявителя</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <md-field>
                                    <label for="claimer_lastname">{{$t('claims.claimer_lastname')}}</label>
                                    <md-input :name="$t('validation.lastname')" id="claimer_lastname" v-model="claimState.claim.lastName"/>
                                </md-field>
                            </div>
                            <div class="col-sm-4">
                                <md-field>
                                    <label for="claimer_info">{{$t('claims.claimer_firstname')}}</label>
                                    <md-input :name="$t('validation.firstname')" id="claimer_info" v-model="claimState.claim.firstName"/>
                                </md-field>
                            </div>
                            <div class="col-sm-4">
                                <md-field>
                                    <label for="claimer_middlename">{{$t('claims.claimer_middlename')}}</label>
                                    <md-input :name="$t('validation.middlename')" id="claimer_middlename" v-model="claimState.claim.middleName"/>
                                </md-field>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <md-field>
                                    <label>Район</label>
                                    <md-select name="сity" id="claimer_сity" v-model="claimState.claim.address.district">
                                        <md-option v-for="(district, index) in districts" :key="index" :value="district">{{ district }}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="col-sm-8">
                                <md-field>
                                    <label for="claim_address">{{$t('claims.claimer_address')}}</label>
                                    <md-input :name="$t('validation.address')" id="claim_address" v-model="claimState.claim.address.location"/>
                                </md-field>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <md-field>
                                    <label for="claimer_phone">{{$t('claims.claimer_phone')}}</label>
                                    <md-input :name="$t('validation.phone')" id="claimer_phone" v-model="claimState.claim.phone"/>
                                </md-field>
                            </div>
                            <div class="col-sm-6">
                                <md-field>
                                    <label for="claimer_email">{{$t('claims.claimer_email')}}</label>
                                    <md-input :name="$t('validation.email')" id="claimer_email" v-model="claimState.claim.email"/>
                                </md-field>
                            </div>
                        </div>

                    </div>
                    <md-dialog-actions>
                        <md-button class="md-primary" @click="setDone('first', 'second')">Продолжить</md-button>
                    </md-dialog-actions>
                </md-step>
                <!-- Шаг второй-->
                <md-step id="second" md-label="Заявка" md-description="подробная информация" :md-done.sync="steps.second">
                    <!-- Информация о заявке-->
                    <div class="form-padding">
                        <div class="row">
                            <div class="col-sm-12 clearfix">
                                <audio controls>
                                    <source :src="claimState.claim.link" type="audio/mpeg">
                                </audio>
                            </div>
                        </div>

                        <br>

                        <claim-problems></claim-problems>

                        <div class="row">
                            <div class="col-sm-12 clearfix">

                                <md-field>
                                    <label>{{$t('claims.claim_description')}}</label>
                                    <md-textarea id="claim_description" name="description" style="height: 75px; min-height: auto !important;"
                                        v-model="claimState.claim.description" md-counter="300"></md-textarea>
                                </md-field>

                            </div>
                        </div>
                    </div>

                    <md-dialog-actions style="top: -30px;">
                        <md-button class="md-primary" @click="closeDialog">{{ $t("common.close") }}</md-button>
                        <md-button class="md-primary" @click="createClaim">{{ $t("common.create") }}</md-button>
                    </md-dialog-actions>

                </md-step>
            </md-steppers>

        </md-dialog>

        <reclaimed></reclaimed>
        <ok-cancel-modal></ok-cancel-modal>

    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import ClaimProblems from '@/components/functional/applications/CreateApplication/ProblemsPartial.vue';
    import { districts } from '../../../../domain/entities/functional/Address';
    import {OkCancelModalProperties, plusButton, statusDialog} from '../../../../domain/util/interface/CommonInterface';
    import IWithRoute from '../../../../domain/util/interface/IWithRoute';
    import UserState from '../../../../store/common/user/types';
    import ISteps from '../../../../domain/util/interface/ISteps';
    import Reclaimed from '@/components/functional/calls/calls/Reclaimed.vue';
    import OkCancelModal from '@/components/util/ui/OkCancelModal.vue';

    @Component({
        components: {ClaimProblems, Reclaimed, OkCancelModal},
    })
    export default class CreateApplication extends Vue implements IWithRoute {
        @Action public createClaim;
        @Action public getClaimsOfTheSamePhone;
        @Action public markCallAsFaulty;

        @State('claim') public claimState!: ClaimState;
        @State('user') public userState!: UserState;

        @Provide() public callType: string = 'Новый';

        @Provide() public districts: string[] = districts;
        @Provide() public showSingleClaimModal: boolean = false;
        @Provide() public active: string = 'zero';

        @Provide() public steps: ISteps = {
            zero: true,
            first: false,
            second: false,
        };

        @Provide() public statusDialog = statusDialog;


        constructor() {
            super();
            OkCancelModalProperties.text = 'Вы хотите отметить звонок как ошибочный?';
            OkCancelModalProperties.title = 'Ошибочный звонок';
            OkCancelModalProperties.okAction = this.markCallAsFaulty;
        }

        public created() {
            statusDialog.show = false;
            plusButton.clickAction = () => statusDialog.show = true;
        }

        public setDone(id, index) {
            this.steps[id] = true;

            if (index) {
                this.active = index;
            }
        }

        public closeDialog() {
            this.statusDialog.show = false;
            this.active = 'active';
            this.steps.first = true;
            this.steps.second = false;
        }

        /**
         * Три статуса: claimed - новая заявка, reclaimed - повторная заявка, failed - ошибка
         * @param processingStatus
         */
        public chooseCallType(processingStatus: string) {
            this.claimState.claim.call.processingStatus = processingStatus;

            if (processingStatus === 'reclaimed') {
                this.getClaimsOfTheSamePhone();
                $('#reclaimedModal').modal('show');
            }

            if (processingStatus === 'failed') {
                $('#sureWindow').modal('show');
                this.statusDialog.show = false;
            }
        }

    }
</script>
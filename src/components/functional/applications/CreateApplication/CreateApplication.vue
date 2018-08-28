<template>

    <!-- Диалоговое окно-->
    <md-dialog :md-active.sync="showDialog" class="customer-dialog">
        <md-dialog-title>Создание заявки</md-dialog-title>
        <!-- Степпер-->
        <md-steppers :md-active-step.sync="active" md-linear>
            <!-- Шаг первый-->
            <md-step id="first" md-label="Заявитель" md-description="личные данные" :md-done.sync="first">
                <!-- Информация о пользователе-->
                <div class="form-padding">
                    <div class="row">
                        <div class="col-sm-4-12 dialog-title">
                            <h5>Информация об поступающего</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <md-field>
                                <label for="claimer_info">{{$t('claims.claimer_firstname')}}</label>
                                <md-input :name="$t('validation.firstname')" id="claimer_info" v-model="claimState.claim.firstName" />
                            </md-field>
                        </div>
                        <div class="col-sm-4">
                            <md-field>
                                <label for="claimer_middlename">{{$t('claims.claimer_middlename')}}</label>
                                <md-input :name="$t('validation.middlename')" id="claimer_middlename" v-model="claimState.claim.middleName" />
                            </md-field>
                        </div>
                        <div class="col-sm-4">
                            <md-field>
                                <label for="claimer_lastname">{{$t('claims.claimer_lastname')}}</label>
                                <md-input :name="$t('validation.lastname')" id="claimer_lastname" v-model="claimState.claim.lastName" />
                            </md-field>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">                                
                            <md-field>
                                <label for="claimer_сity">Город</label>
                                <md-select name="сity" id="claimer_сity" v-model="claimState.claim.address.district">
                                    <md-option v-for="(district, index) in districts" :key="index" :value="district">{{ district }}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="col-sm-8">
                            <md-field>
                                <label for="claim_address">{{$t('claims.claimer_address')}}</label>
                                <md-input :name="$t('validation.address')" id="claim_address" v-model="claimState.claim.address.location" />
                            </md-field>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <md-field>
                                <label for="claimer_phone">{{$t('claims.claimer_phone')}}</label>
                                <md-input :name="$t('validation.phone')" id="claimer_phone" v-model="claimState.claim.phone" />
                            </md-field>
                        </div>
                        <div class="col-sm-6">
                            <md-field>
                                <label for="claimer_email">{{$t('claims.claimer_email')}}</label>
                                <md-input :name="$t('validation.email')" id="claimer_email" v-model="claimState.claim.email" />
                            </md-field>
                        </div>
                    </div>

                </div>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="setDone('first', 'second')">Продолжить</md-button>
                </md-dialog-actions>                
            </md-step>
            <!-- Шаг второй-->
            <md-step id="second" md-label="Заявка" md-description="подробная информация" :md-done.sync="second">
                <!-- Информация о заявке-->
                <div class="form-padding">
                    <div class="row">
                        <div class="col-sm-4-12 dialog-title">
                            <h5>Информация о заявке</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <md-field>
                                <label for="claim_name">{{$t('claims.claim_name')}}</label>
                                <md-input :name="$t('validation.name')" id="claim_name" v-model="claimState.claim.name" />
                            </md-field>
                        </div>                            
                    </div>

                    <claim-problems></claim-problems>

                    <div class="row">
                        <div class="col-sm-12 clearfix">
                            
                            <md-field>
                                <label>{{$t('claims.claim_description')}}</label>
                                <md-textarea id="claim_description" name="description" style="height: 75px; min-height: auto !important;"
                                    v-model="claimState.claim.description" md-counter="40"></md-textarea>
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

</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import ClaimProblems from '@/components/functional/applications/CreateApplication/ProblemsPartial.vue';
    import { districts } from '../../../../domain/entities/functional/Address';
    import {plusButton} from '../../../../domain/util/interface/CommonInterface';

    @Component({
        components: {ClaimProblems},
    })
    export default class CreateApplication extends Vue {
        @Action('createClaim')
        public createClaim;

        @State('claim')
        public claimState!: ClaimState;

        @Provide()
        public districts: string[] = districts;

        @Provide()
        public showDialog: boolean = false;

        @Provide()
        public active: string = 'first';

        @Provide()
        public first: boolean = true;

        @Provide()
        public second: boolean = false;

        constructor() {
            super();
            plusButton.clickAction = this.createProblemType;
        }

        public setDone(id, index) {
            this[id] = true;

            if (index) {
                this.active = index;
            }
        }

        public createProblemType() {
            this.showDialog = true;
        }

        public closeDialog() {
            this.showDialog = false;
            this.active = 'active';
            this.first = true;
            this.second = false;
        }

    }
</script>
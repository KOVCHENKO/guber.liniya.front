<template>
    <div class="modal fade" id="updateApplication" tabindex="-1" role="dialog"
         aria-labelledby="updateApplicationLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content cst-md-content">
                <div class="modal-header">
                    <h5 class="modal-title">Информаци по заявке</h5>
                    <button type="button" class="close" aria-label="Close" @click="closeDialog">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
					<ul class="nav nav-tabs" id="myTab" role="tablist">
					    <li class="nav-item">
					    	<a class="nav-link active" id="home-tab" data-toggle="tab" href="#applic-data" role="tab" aria-controls="applic-data" aria-selected="true">Данные заявителя</a>
					    </li>
					    <li class="nav-item">
					    	<a class="nav-link" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Информация</a>
					    </li>
					    <li class="nav-item">
					    	<a class="nav-link" id="connected-tab" data-toggle="tab" href="#claim" role="tab" aria-controls="claim" aria-selected="false">Связанные заявки</a>
					    </li>
					    <li class="nav-item">
					    	<a class="nav-link" id="files-tab" data-toggle="tab" href="#file" role="tab" aria-controls="file" aria-selected="false">Файлы</a>
					    </li>
					</ul>
					<div class="tab-content" id="myTabContent">
					    <div class="tab-pane fade show active" id="applic-data" role="tabpanel" aria-labelledby="applic-data-tab">
                            <div class="form-padding">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label for="claimer_lastname">{{$t('claims.claimer_lastname')}}</label>
                                        <input :name="$t('validation.lastname')" id="claimer_lastname" v-model="claimState.claim.applicant.lastname" :disabled="disabledBasedOnDispatchStatus"/>
                                    </div>
                                    <div class="col-sm-4">
                                        <label for="claimer_info">{{$t('claims.claimer_firstname')}}</label>
                                        <input :name="$t('validation.firstname')" id="claimer_info" v-model="claimState.claim.applicant.firstname" :disabled="disabledBasedOnDispatchStatus"/>
                                    </div>
                                    <div class="col-sm-4">
                                        <label for="claimer_middlename">{{$t('claims.claimer_middlename')}}</label>
                                        <input :name="$t('validation.middlename')" id="claimer_middlename" v-model="claimState.claim.applicant.middlename" :disabled="disabledBasedOnDispatchStatus"/>
                                    </div>
                                </div>

                                  <!--Адреса заявителя-->
                                <fias-address :city="claimState.claim.address.city"
                                              :street="claimState.claim.address.street"
                                              :building="claimState.claim.address.building"
                                              v-on:update:city="claimState.claim.address.city = $event"
                                              v-on:update:street="claimState.claim.address.street = $event"
                                              v-on:update:building="claimState.claim.address.building = $event"
                                              :validation="validation">
                                </fias-address>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <label for="claimer_phone">{{$t('claims.claimer_phone')}}</label>
                                        <input :name="$t('validation.phone')" id="claimer_phone" v-model="claimState.claim.phone" :disabled="disabledBasedOnDispatchStatus"/>
                                        <span v-if="claimState.claim.phone === ''" class="md-error">Необходимо ввести телефон</span>
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="claimer_email">{{$t('claims.claimer_email')}}</label>
                                        <input :name="$t('validation.email')" id="claimer_email" v-model="claimState.claim.email" :disabled="disabledBasedOnDispatchStatus"/>
                                    </div>
                                </div>

                          </div>
                        </div>
					    <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                            <div class="form-padding">
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
                                    <div class="col-sm-6" v-if="claimState.responsibleOrganizations === ''">
                                        <label>Информация отсутствует</label>
                                    </div>
                                    <div class="col-sm-6" v-else>
                                        <label v-for="(respOrg, index) in claimState.responsibleOrganizations" :key="index">{{ respOrg.name }}</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 clearfix">

                                        <label>{{$t('claims.claim_description')}}</label>
                                        <textarea id="claim_description" name="description" style="height: 75px; min-height: auto !important;" class="textarea-resize-none"
                                                    v-model="claimState.claim.description" :disabled="disabledBasedOnDispatchStatus"></textarea>
                                        <span v-if="claimState.claim.description === ''" class="md-error">Необходимо заполнить содержание</span>

                                    </div>
                                </div>
                            </div>
                        </div>
					    <div class="tab-pane fade" id="claim" role="tabpanel" aria-labelledby="claim-tab">
                            <div class="cst-scrollbar">
                                <span v-if="claimState.claim.parents !== null">
                                    <div class="row" v-for="(parentClaim, index) in claimState.claim.parents" :key="index">
                                        <div class="col-sm-3 clearfix" style="line-height: 58px;">
                                            {{ parentClaim.created_at }}
                                        </div>
                                        <div class="col-sm-9 clearfix">
                                            <audio style="width: 100%;" controls>
                                                <source :src="parentClaim.link" type="audio/mpeg">
                                            </audio>
                                        </div>
                                    </div>
                                </span>
                                <div class="row" v-if="claimState.claim.parents.length === 0">
                                    <div class="col-sm-6 clearfix">
                                        История по заявке отсутсвует
                                    </div>
                                </div>
                            </div>
                        </div>
					    <div class="tab-pane fade" id="file" role="tabpanel" aria-labelledby="file-tab">
                            <div class="cst-scrollbar">
                                <span v-if="claimState.confirmationFiles !== null">
                                    <div class="row" v-for="(file, index) in claimState.confirmationFiles" :key="index">
                                        <div class="col-sm-12 clearfix">
                                            <a :href="baseRootUrl + file.path" download>Скачать</a>
                                        </div>
                                    </div>
                                </span>
                                <div class="row" v-if="claimState.confirmationFiles.length === 0">
                                    <div class="col-sm-12 clearfix">
                                        Подтверждаюшие файлы отсутствуют
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
                </div>
                <div class="modal-footer">
                    <base-button :buttonClass="'btn btn-primary'" @click="closeDialog">{{ $t("common.close") }}</base-button>
                    <base-button :buttonClass="'btn btn-secondary'" @click="pushUpdate">{{ $t("common.update") }}</base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ClaimState from '@/store/functional/claim/types';
    import { districts } from '@/domain/entities/functional/Address';
    import { plusButton } from '@/domain/util/interface/CommonInterface';
    import IWithRoute from '@/domain/util/interface/IWithRoute';
    import UserState from '@/store/common/user/types';
    import RoleResolver from '@/domain/services/functional/roles/RoleResolver';
    import {baseRootUrl} from '@/globals';
    import BaseButton from '@/components/base/BaseButton.vue';
    import FiasAddress from '@/components/functional/addresses/AddressPartial.vue';
    import ApplicantState from '@/store/functional/applicant/types';


    @Component({
        components: {BaseButton, FiasAddress},
    })
    export default class UpdateApplication extends Vue implements IWithRoute {
        @Action public updateClaim;

        @State('claim') public claimState!: ClaimState;
        @State('user') public userState!: UserState;
        @State('applicant') public applicantState!: ApplicantState;
        // Validation для адресов фиас
        @Provide() public validation: string = '';

        @Provide() public baseRootUrl = baseRootUrl;

        @Provide() public districts: string[] = districts;

        // public loadingOption = loading;

        // TODO: 04.02 - xarrper. Нужно?
        public created() {
            plusButton.clickAction = () => $('#updateApplication').modal('show');
        }

        public closeDialog() {
            $('#updateApplication').modal('hide');
            $('#myTab li:first-child a').tab('show');
        }

        public mounted() {
            const self = this;
            $('#updateApplication').on('hidden.bs.modal', () => {
                self.closeDialog();
            });
        }

        public pushUpdate() {
            let resolvedRole;
            resolvedRole = RoleResolver.resolveRole(this.userState.role.name);
            this.updateClaim({ updatedDispatchStatus: resolvedRole.getDispatchStatusToUpdate() });

            if (this.userState.role.name === 'supervisor') {
                this.closeDialog();
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

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
						<a class="nav-link" id="profile-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Информация</a>
					  </li>
					  <li class="nav-item">
						<a class="nav-link" id="contact-tab" data-toggle="tab" href="#claim" role="tab" aria-controls="claim" aria-selected="false">Связанные заявки</a>
					  </li>
                      <li class="nav-item">
						<a class="nav-link" id="profile-tab" data-toggle="tab" href="#comment" role="tab" aria-controls="comment" aria-selected="false">Комментарии</a>
					  </li>
					  <li class="nav-item">
						<a class="nav-link" id="contact-tab" data-toggle="tab" href="#file" role="tab" aria-controls="file" aria-selected="false">Файлы</a>
					  </li>
					</ul>
					<div class="tab-content" id="myTabContent">
					  <div class="tab-pane fade show active" id="applic-data" role="tabpanel" aria-labelledby="applic-data-tab">
                          <div class="form-padding">
                            <div class="row">
                                <div class="col-sm-4">
                                    <label for="claimer_lastname">{{$t('claims.claimer_lastname')}}</label>
                                    <input :name="$t('validation.lastname')" id="claimer_lastname" v-model="claimState.claim.lastName" :disabled="disabledBasedOnDispatchStatus"/>
                                </div>
                                <div class="col-sm-4">
                                    <label for="claimer_info">{{$t('claims.claimer_firstname')}}</label>
                                    <input :name="$t('validation.firstname')" id="claimer_info" v-model="claimState.claim.firstName" :disabled="disabledBasedOnDispatchStatus"/>
                                </div>
                                <div class="col-sm-4">
                                    <label for="claimer_middlename">{{$t('claims.claimer_middlename')}}</label>
                                    <input :name="$t('validation.middlename')" id="claimer_middlename" v-model="claimState.claim.middleName" :disabled="disabledBasedOnDispatchStatus"/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4">
                                    <label for="claimer_сity">Район</label>
                                    <select class="form-control" id="claimer_сity" name="сity" v-model="claimState.claim.address.district" :disabled="disabledBasedOnDispatchStatus">
                                        <option v-for="(district, index) in districts" :key="index" :value="district">{{ district }}</option>
                                    </select>
                                </div>
                                <div class="col-sm-8">
                                    <label for="claim_address">{{$t('claims.claimer_address')}}</label>
                                    <input :name="$t('validation.address')" id="claim_address" v-model="claimState.claim.address.location" :disabled="disabledBasedOnDispatchStatus"/>
                                </div>
                            </div>

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
                                <div class="col-sm-6" v-if="claimState.responsibleOrganizations == ''">
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
                      <div class="tab-pane fade" id="comment" role="tabpanel" aria-labelledby="comment-tab">
                        <div class="cst-scrollbar">
                            <span v-if="claimState.claim.comments !== null">
                                <div class="row" v-for="(comment, index) in claimState.claim.comments" :key="index">
                                    <div class="col-sm-12 clearfix" style="padding: 10px; border-bottom: 1px solid #d2d2d2;">
                                        {{ comment.text }}
                                    </div>
                                </div>
                            </span>
                            <div class="row" v-if="claimState.claim.comments.length === 0">
                                <div class="col-sm-12 clearfix">
                                    Комментарии к заявке отсутствуют
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
                    <button type="button" class="btn btn-secondary" aria-label="Close" @click="closeDialog">{{ $t("common.close") }}</button>
                    <!--<button type="button" class="btn btn-primary" @click="pushUpdate" :disabled="disabledBasedOnDispatchStatus">{{ $t("common.update") }}</button>-->
                    <button type="button" class="btn btn-primary" @click="pushUpdate" :disabled="disabledBasedOnDispatchStatus">{{ sendUpdateButton }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import { districts } from '../../../../domain/entities/functional/Address';
    import { plusButton } from '../../../../domain/util/interface/CommonInterface';
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

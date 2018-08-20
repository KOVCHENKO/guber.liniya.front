<template>
        <!-- Modal - Create cabinet -->
        <div class="modal fade bs-example-modal-lg" id="createClaimModal" tabindex="-1" role="dialog" aria-labelledby="createClaimModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">                        
                        <h4 class="modal-title" id="createClaimModalLabel">{{ $t("claims.create_claim_modal_title") }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                <div class="modal-body">

                    <div class="form-padding">
                        <div class="row">
                            <div class="col-sm-4-12">
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
                    <hr>
                    <div class="form-padding">
                        <div class="row">
                            <div class="col-sm-4-12">
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
                                <textarea id="claim_description" name="description" cols="25" rows="5" v-model="claimState.claim.description"
                                    :placeholder="this.$t('claims.claim_description')">
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click="createClaim">{{ $t("common.create") }}</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{ $t("common.close") }}</button>
                    </div>

                </div>
            </div>
        </div>
        <!--end of modal -->
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import ClaimProblems from '@/components/functional/applications/CreateApplication/ProblemsPartial.vue';
    import { districts } from '../../../../domain/entities/functional/Address';

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

    }
</script>
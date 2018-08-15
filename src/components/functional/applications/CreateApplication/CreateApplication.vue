<template>
        <!-- Modal - Create cabinet -->
        <div class="modal fade bs-example-modal-lg" id="createClaimModal" tabindex="-1" role="dialog" aria-labelledby="createClaimModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="createClaimModalLabel">{{ $t("claims.create_claim_modal_title") }}</h4>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-sm-3 clearfix">
                                <label for="claim_name" class="input-title">{{ $t("claims.claim_name") }}:</label>
                            </div>
                            <div class="col-sm-9 clearfix">
                                <input id="claim_name" type="text" :name="$t('validation.name')" :placeholder="$t('claims.claim_name')"
                                       v-model="claimState.claim.name"
                                       v-validate="'required|max:255'">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3 clearfix">
                                <label for="claimer_info" class="input-title">{{ $t("claims.claimer_info") }}:</label>
                            </div>
                            <div class="col-sm-3 clearfix">
                                <input id="claimer_info" type="text" :name="$t('validation.firstname')" :placeholder="$t('claims.claimer_firstname')"
                                       v-model="claimState.claim.firstName"
                                       v-validate="'required|max:255'">
                            </div>
                            <div class="col-sm-3 clearfix">
                                <input id="claimer_middlename" type="text" :name="$t('validation.middlename')" :placeholder="$t('claims.claimer_middlename')"
                                       v-model="claimState.claim.middleName"
                                       v-validate="'required|max:255'" title="Отчетство">
                            </div>
                            <div class="col-sm-3 clearfix">
                                <input id="claimer_lastname" type="text" :name="$t('validation.lastname')" :placeholder="$t('claims.claimer_lastname')"
                                       v-model="claimState.claim.lastName"
                                       v-validate="'required|max:255'" title="Фамилия">
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-sm-3 clearfix"></div>
                            <div class="col-sm-4 clearfix">
                                <input id="claimer_phone" type="text" :name="$t('validation.phone')" :placeholder="$t('claims.claimer_phone')"
                                       v-model="claimState.claim.phone"
                                       v-validate="'required|max:255'" title="Телефон">
                            </div>
                            <div class="col-sm-5 clearfix">
                                <input id="claimer_email" type="text" :name="$t('validation.email')" :placeholder="$t('claims.claimer_email')"
                                       v-model="claimState.claim.email"
                                       v-validate="'required|max:255'" title="Email">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4 clearfix">
                                <label for="claim_name" class="input-title">{{ $t("claims.claimer_address") }}:</label>
                            </div>
                            <div class="col-sm-2 clearfix">
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="claim_sub_type" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        {{ claimState.claim.address.district }}
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li v-for="district in districts" @click="claimState.claim.address.district = district">
                                            <a href="javascript:void(0);">{{ district }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-sm-6 clearfix">
                                <input id="claim_address" type="text" :name="$t('validation.address')" :placeholder="$t('claims.claimer_address')"
                                       v-model="claimState.claim.address.location"
                                       v-validate="'required|max:255'" title="Адрес">
                            </div>
                        </div>

                        <claim-problems></claim-problems>

                        <div class="row">
                            <div class="col-sm-3 clearfix">
                                <label for="claim_description" class="input-title">{{ $t("claims.claim_description") }}:</label>
                            </div>
                            <div class="col-sm-9 clearfix">
                                <textarea id="claim_description" name="description" cols="25" rows="5" v-model="claimState.claim.description"
                                    :placeholder="this.$t('claims.claim_description')">
                                </textarea>
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
<template>
    <!-- Modal - create applicant -->
    <div class="modal fade" id="createApplicantModal" tabindex="-1" role="dialog"
         aria-labelledby="createApplicantModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="createApplicantModalLabel">{{$t('applicant.add_applicant')}}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">

                        <div class="col-sm-4">
                            <label for="applicant_lastname">{{$t('claims.claimer_lastname')}}</label>
                            <input :name="$t('validation.lastname')" id="applicant_lastname"
                                   v-model="applicantState.applicant.lastname"/>
                        </div>

                        <div class="col-sm-4">
                            <label for="applicant_firstname">{{$t('claims.claimer_firstname')}}</label>
                            <input :name="$t('validation.firstname')" id="applicant_firstname"
                                   v-model="applicantState.applicant.firstname"/>
                        </div>

                        <div class="col-sm-4">
                            <label for="applicant_middlename">{{$t('claims.claimer_middlename')}}</label>
                            <input :name="$t('validation.middlename')" id="applicant_middlename"
                                   v-model="applicantState.applicant.middlename"/>
                        </div>

                    </div>


                    <div class="row">

                        <div class="col-sm-6">
                            <label for="applicant_phone">{{$t('claims.claimer_phone')}}</label>
                            <input :name="$t('validation.lastname')" id="applicant_phone" v-mask="'+7(###)###-##-##'"
                                   v-model="applicantState.applicant.phone"/>
                        </div>

                        <div class="col-sm-6">
                            <label for="claimer_email">{{$t('claims.claimer_email')}}</label>
                            <input :name="$t('validation.email')" id="claimer_email"
                                   v-model="applicantState.applicant.email"/>
                        </div>

                    </div>

                    <fias-address :city="applicantState.applicant.address.city"
                                  :street="applicantState.applicant.address.street"
                                  :building="applicantState.applicant.address.building"
                                  v-on:update:city="applicantState.applicant.address.city = $event"
                                  v-on:update:street="applicantState.applicant.address.street = $event"
                                  v-on:update:building="applicantState.applicant.address.building = $event"
                                  :validation="validation"></fias-address>

                    <div class="row">
                        <button type="button" class="btn btn-primary"  @click="addApplicant">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ApplicantState from '@/store/functional/applicant/types';
    import FiasAddress from '@/components/functional/addresses/AddressPartial.vue';

    @Component({
        components: {FiasAddress},
    })
    export default class AddApplicant extends Vue {

        @State('applicant') public applicantState!: ApplicantState;

        @Action public createApplicant;

        // Validation для адресов фиас
        @Provide() public validation: string = '';


        public addApplicant() {
            this.createApplicant();
            // Добавить заявителя
        }


    }
</script>

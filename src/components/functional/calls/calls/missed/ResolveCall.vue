<template>
    <div>
        <div class="modal fade" id="resolveCall" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Создание заявки</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <vue-good-wizard
                            ref="vueGoodWizard"
                            :previousStepLabel="'Назад'"
                            :nextStepLabel="'Вперед'"
                            :steps="steps"
                            :onNext="nextClicked" 
                            :onBack="backClicked">
                            <div slot="page1">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <h5>Тип звонка</h5>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="claimed" value="claimed" @click="chooseCallType('claimed')"
                                                v-model="callType" class="custom-control-input">
                                            <label class="custom-control-label" for="claimed">Заявка</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="reclaimed" value="reclaimed"
                                                @click="chooseCallType('reclaimed')" v-model="callType"
                                                class="custom-control-input">
                                            <label class="custom-control-label" for="reclaimed">Повторная заявка</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="failed" value="failed" @click="chooseCallType('failed')"
                                                v-model="callType" class="custom-control-input">
                                            <label class="custom-control-label" for="failed">Ошибка</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>Уровень проблемы</h5>

                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="generalChekbox" v-model="claimLevel">
                                            <label class="custom-control-label" for="generalChekbox">Общезначимая</label>
                                        </div>

                                        <div>
                                            <audio style="margin-top: 5px; width: 100%;" controls>
                                                <source :src="claimState.claim.link" type="audio/mpeg">
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot="page2">
                                <h5>Данные заявителя
                                    <span id="add-applicant-span">
                                        <button type="button" class="btn btn-primary" @click="newApplicant">Добавить</button>
                                    </span>
                                </h5>
                                <div class="form-padding">
                                    <applicants-list></applicants-list>
                                </div>
                            </div>
                            <div slot="page3">
                                <div class="form-padding">
                                    <problems-partial></problems-partial>

                                    <div class="row">
                                        <div class="col-sm-12 clearfix">

                                            <label for="claim_description">{{$t('claims.claim_description')}}</label>
                                            <textarea :name="$t('validation.description')" id="claim_description"
                                                    v-model="claimState.claim.description"></textarea>
                                            <span v-if="claimState.claim.description === ''" class="md-error">Необходимо заполнить содержание</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </vue-good-wizard>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">{{ $t("common.close") }}</button>
                        <button type="button" class="btn btn-primary" @click="dispatchClaimCreate" v-if="buttonVisibleModal">{{ $t("common.create") }}</button>
                        <button type="button" class="btn btn-primary" @click="dispatchClaimCreateMore" v-if="buttonVisibleModal">{{ $t("common.create_more") }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Модальное окно - добавить заявителя-->
        <add-applicant></add-applicant>

        <!--Модальное окно - повторная заявка-->
        <reclaimed></reclaimed>

        <!--Модальное окно - да-нет, подтверждение-->
        <ok-cancel-modal></ok-cancel-modal>

    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import ClaimState from '@/store/functional/claim/types';
    import ProblemsPartial from '@/components/functional/calls/calls/missed/ProblemsPartial.vue';
    import {default as Address, districts} from '@/domain/entities/functional/Address';
    import {OkCancelModalProperties, plusButton} from '@/domain/util/interface/CommonInterface';
    import IWithRoute from '@/domain/util/interface/IWithRoute';
    import UserState from '@/store/common/user/types';
    import Reclaimed from '@/components/functional/calls/calls/missed/Reclaimed.vue';
    import OkCancelModal from '@/components/util/ui/OkCancelModal.vue';
    import CallState from '@/store/functional/call/types';
    import ApplicantsList from '@/components/functional/calls/calls/missed/partials/ApplicantsList.vue';
    import AddApplicant from '@/components/functional/calls/calls/missed/partials/AddApplicant.vue';

    @Component({
        components: {ProblemsPartial, Reclaimed, OkCancelModal, ApplicantsList, AddApplicant},
    })
    export default class CreateApplication extends Vue implements IWithRoute {

        public $refs!: {
            vueGoodWizard: HTMLFormElement,
        };

        @Action public createClaim;
        @Action public getClaimsOfTheSamePhone;
        @Action public markCallAsFaulty;
        @Action public getAllClaims;

        @State('claim') public claimState!: ClaimState;
        @State('user') public userState!: UserState;
        @State('call') public callState!: CallState;

        @Provide() public callType: string = 'Новый';
        @Provide() public claimLevel: boolean = false;

        @Provide() public districts: string[] = districts;
        @Provide() public showSingleClaimModal: boolean = false;

        @Provide() public steps = [
            {
                label: 'Данные звонка. Тип звонка', // md-description="тип звонка"
                slot: 'page1',
            },
            {
                label: 'Заявитель. Личные данные', // md-description="личные данные"
                slot: 'page2',
            },
            {
                label: 'Заявка. Подробная информация', // md-description="подробная информация"
                slot: 'page3',
            },
        ];

        @Provide() public buttonVisibleModal = false;

        constructor() {
            super();
            OkCancelModalProperties.text = 'Вы хотите отметить звонок как ошибочный?';
            OkCancelModalProperties.title = 'Ошибочный звонок';
            OkCancelModalProperties.okAction = this.markCallAsFaulty;
        }

        public nextClicked(currentPage) {
            if (currentPage === 1) {
                this.buttonVisibleModal = true;
            }
            return true;
        }

        public backClicked(currentPage) {
            this.buttonVisibleModal = false;
            return true;
        }

        // TODO: 01.02 - xarrper. Нужно?
        public created() {
            plusButton.clickAction = () => $('#resolveCall').modal('show');
        }

        // TODO: 28.01 - xarrper.
        public mounted() {
            const self = this;
            $('#resolveCall').on('shown.bs.modal', () => {
                this.$refs.vueGoodWizard.handleResize();
            });
            $('#resolveCall').on('hidden.bs.modal', () => {
                self.closeDialog();
            });
        }

        public closeDialog() {
            $('#resolveCall').modal('hide');
            this.$refs.vueGoodWizard.currentStep = 0;
            this.buttonVisibleModal = false;
        }

        /**
         * Три статуса: claimed - новая заявка, reclaimed - повторная заявка, failed - ошибка
         * @param processingStatus
         */
        public chooseCallType(processingStatus: string) {
            this.claimState.claim.call.processingStatus = processingStatus;

            // Повторные заявки
            if (processingStatus === 'reclaimed') {
                this.getClaimsOfTheSamePhone();
                this.getAllClaims({dispatchStatus: 'dispatched'});
                $('#reclaimedModal').modal('show');
            }

            // Со статусом ошибочная
            if (processingStatus === 'failed') {
                $('#sureWindow').modal('show');
                this.closeDialog();
            }

            // Новая заявка
            if (processingStatus === 'claimed') {

                this.claimState.claim.phone = this.callState.call.clientPhone;
                this.claimState.claim.call = this.callState.call;
                this.claimState.claim.call.processingStatus = 'claimed';

                // this.claimState.claim = new Claim(0, '', '', '', '', '', this.callState.call.clientPhone, '', '',
                //     this.callState.call.link, '', null, '', [{}], [],
                //     new Address(0, 'Астрахань', ''), new Problem(0, '', ''),
                //     new Call(this.callState.call.id, this.callState.call.callId, this.callState.call.clientPhone,
                //         this.callState.call.link, this.callState.call.atsStatus, 'in', '', 'claimed',
                //         this.callState.call.createdAt));
            }
        }

        /**
         * Перед отправкой проблемы необходимо обозначить уровень
         */
        public dispatchClaimCreate() {
            // Уровень заявки: личный или общезначимый
            this.claimState.claim.level = this.claimLevelStringified;

            // Создать заявку
            this.createClaim().then((response) => {
                if (response.status === 200) {
                    this.closeDialog();
                }
            });
        }

        /**
         * Перед отправкой проблемы необходимо обозначить уровень
         */
        public dispatchClaimCreateMore() {
            // Уровень заявки: личный или общезначимый
            this.claimState.claim.level = this.claimLevelStringified;

            // Создать заявку без закрытия
            this.createClaim();
        }

        /**
         * Открыть окно с возностью добавить нового заявителя
         */
        public newApplicant() {
            $('#createApplicantModal').modal('show');
        }

        get claimLevelStringified() {
            return (this.claimLevel === true) ? 'Общезначимая' : 'Личная';
        }

    }
</script>

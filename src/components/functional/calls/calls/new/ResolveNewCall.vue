<template>
    <div class="modal fade" id="resolveNewCall" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Новый звонок</h5>
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
                                <div class="col-sm-3">
                                    <label for="call_start">{{ $t('call.call_start') }}</label>
                                </div>
                                <div class="col-sm-4">
                                    <input id="call_start" value="20:12 19.02.2019" disabled/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label for="call_phone">{{ $t('call.call_phone') }}</label>
                                </div>
                                <div class="col-sm-4">
                                    <input id="call_phone" value="20:12 19.02.2019" disabled/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <label for="call_supposed_applicant">{{ $t('call.call_supposed_applicant') }}</label>
                                </div>
                                <div class="col-sm-4">
                                    <input id="call_supposed_applicant" value="Иванов Иван Иванович" disabled/>
                                </div>
                                <div class="col-sm-3">
                                    <span id="new_call_applicant_claims">
                                        <span @click="showApplicantCard">Карточка</span> /
                                        <span @click="showApplicantClaims">Заявки</span>
                                    </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <button type="button" class="btn btn-primary">Новый</button>
                                    <button type="button" class="btn btn-primary">Список</button>
                                </div>
                            </div>
                        </div>
                        <div slot="page2">
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
                        <div slot="page3">
                            <button type="button" class="btn btn-primary" @click="addTask">Добавить</button>
                            <div class="row" v-for="task in tasksCount">
                                <div class="col-sm-7">
                                    <input value="Задача" placeholder="Наименование работ" v-model="task.name"/>
                                </div>

                                <div class="col-sm-4">
                                    <select class="form-control" name="organization" id="organization" v-model="task.organizationId">
                                        <option v-for="(organization, index) in organizationState.organizations" :key="index" :value="organization.id">
                                            {{ organization.name }}
                                        </option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </vue-good-wizard>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">{{ $t("common.close") }}</button>
                    <button type="button" class="btn btn-primary" @click="createClaim">{{ $t("common.create") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import ProblemsPartial from '@/components/functional/calls/calls/missed/ProblemsPartial.vue';
    import ClaimState from '@/store/functional/claim/types';
    import {State, Action} from 'vuex-class';
    import BaseButton from '@/components/base/BaseButton.vue';
    import OrganizationState from '@/store/functional/organization/types';


    @Component({
        components: { ProblemsPartial, BaseButton },
    })
    export default class ResolveNewCall extends Vue {

        public $refs!: {
            vueGoodWizard: HTMLFormElement,
        };

        @State('claim') public claimState!: ClaimState;

        @Provide() public steps = [
            {
                label: 'Звонок',
                slot: 'page1',
            },
            {
                label: 'Подробная информация',
                slot: 'page2',
            },
            {
                label: 'Дополнительно',
                slot: 'page3',
            },
        ];

        // DropDown organizations
        @Provide() public organizationId: number = 0;
        @State('organization') public organizationState!: OrganizationState;
        @Action public getAllPlainOrganizations;

        @Provide() public tasksCount: any = [{
            name: '',
            organizationId: 0,
        }];

        public created() {
            this.getAllPlainOrganizations();
        }

        public mounted() {
            $('#resolveNewCall').on('shown.bs.modal', () => {
                // @ts-ignore
                this.$refs.vueGoodWizard.handleResize();
            });
        }

        public nextClicked(currentPage) {
            if (currentPage === 1) {
                // this.buttonVisibleModal = true;
            }
            return true;
        }

        public backClicked(currentPage) {
            // this.buttonVisibleModal = false;
            return true;
        }

        public showApplicantCard() {
            // console.log('show applicant card');
        }

        public showApplicantClaims() {
            // console.log('show applicant claims');
        }

        public addTask() {
            // this.tasksCount.push();
            this.tasksCount.push({
                name: '',
                organizationId: 0,
            });
        }

        public createClaim() {
            // Отработка метода на создание заявки
        }

    }
</script>

<style>
    #new_call_applicant_claims {
        margin-left: 30px;
    }
</style>

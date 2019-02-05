<template>
    <div class="modal fade" id="closeClaim" tabindex="-1" role="dialog"
	 aria-labelledby="closeClaimLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content cst-md-content">
                <div class="modal-header">
                    <h5 class="modal-title">Информация по заявке</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>{{ claimState.claim.description }}</div>

                    <div>
                        <audio style="margin-top: 58px; width: 100%;" controls>
                            <source :src="claimState.claim.link" type="audio/mpeg">
                        </audio>
                    </div>

                    <br>

                    <div class="md-list-item-text">
                        <span v-if="claimState.responsibleOrganizations == ''">Информация отсутсвует</span>
                        <span v-else>{{ claimState.responsibleOrganizations[0].name }}</span>
                        <span class="color-light-grey">Организация</span>
                    </div>

                    <div class="row">
                        <div class="col-sm-4 padding-right">
                            <p class="claim-label">Активности по заявке:</p>
                        </div>
                        <div class="col-sm-1 padding-left"></div>
                        <div class="col-sm-7">
                            <div class="md-layout-item">
                                <label>Изменить статус</label>
                                <select class="form-control" name="status" id="claimer_status" v-model="statusData">
                                    <option value="not_executed">{{ statusClaims[0] }}</option>
                                    <option value="executed_partially">{{ statusClaims[1] }}</option>
                                    <option value="executed_totally">{{ statusClaims[2] }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- TODO: 1. -->
                    <div class="cst-scrollbar">
                        <div class="md-list-item-text">
                            <span v-if="claimState.claim.comments.length == 0">Комментарий отсутсвует</span>
                            <span v-else>
                                <p v-for="(comment, index) in claimState.claim.comments" :key="index">{{ comment.text }}</p>
                            </span>
                            <span class="color-light-grey">Комментарий</span>
                        </div>
                    </div>

                    <div>
                        <p class="claim-text" v-if="claimState.claim.firstName === '' && claimState.claim.middleName === '' && claimState.claim.lastName === ''">Нет данных</p>
                        <p class="claim-text" v-else>{{ claimState.claim.firstName }} {{ claimState.claim.middleName }} {{ claimState.claim.lastName }}</p>
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

                </div>
                <div class="modal-footer">                    
                    <button type="button" class="btn btn-secondary" aria-label="Close" data-dismiss="modal">{{ $t("common.close") }}</button>
                    <button type="button" class="btn btn-primary" @click="dispatchClose">{{ $t("common.update") }}</button>                
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
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

        @Provide()
        public statusClaims: any = [NOT_EXECUTED, EXECUTED_PARTIALLY, EXECUTED_TOTALLY];

        @Provide() public statusData: string = '';

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
<template>

    <div class="modal fade" id="claimInfo" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Информация по заявке</h5>
                    <button type="button" class="close" @click="closeDialog">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="claim-container claim-content">
                        {{ claimState.claim.description }}
                    </div>

                    <div class="claim-container claim-content">
                        <audio style="margin-top: 58px; width: 100%;" controls>
                            <source :src="claimState.claim.link" type="audio/mpeg">
                        </audio>
                    </div>

                    <div class="claim-container claim-content">
                        Проблема: {{ claimState.claim.problem.name }}
                    </div>

                    <div class="claim-container claim-content">
                        <p>{{ claimState.claim.firstName }} {{ claimState.claim.middleName }} {{ claimState.claim.lastName }}</p>
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
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeDialog">{{ $t("common.close") }}</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {statusDialogOfSecondLevel} from '../../../../domain/util/interface/CommonInterface';
    import {State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';

    @Component
    export default class ClaimInfo extends Vue {

        @State('claim') public claimState!: ClaimState;

        @Provide() public statusDialogOfSecondLevel = statusDialogOfSecondLevel;

        public closeDialog() {
            $('#claimInfo').modal('hide');
        }

    }
</script>

<template>
    <md-dialog :md-active.sync="statusDialogOfSecondLevel.show" class="customer-dialog" style="width: 640px !important; max-height: 100%; z-index: 99999">

        <md-dialog-title>Информация по заявке</md-dialog-title>
        <div class="dialog-line-shadow"></div>
        <div class="claim-container">
            <md-content class="md-scrollbar claim-scrollbar">{{ claimState.claim.description }}</md-content>

            <div class="claim-container">
                <md-content class="claim-text">{{ claimState.claim.firstName }} {{ claimState.claim.middleName }} {{ claimState.claim.lastName }}</md-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <div class="md-list-item-text">
                            <span class="color-light-grey">Телефон</span>
                            <span>{{ claimState.claim.phone }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="dialog-line"></div>

        <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog">{{ $t("common.close") }}</md-button>
        </md-dialog-actions>

    </md-dialog>
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
            statusDialogOfSecondLevel.show = false;
        }




    }
</script>

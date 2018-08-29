<template>
    <!-- Диалоговое окно-->
    <md-dialog :md-active.sync="statusDialog.show" class="customer-dialog" style="width: 640px !important;">
    
    <md-dialog-title>Изменить статус заявки</md-dialog-title>
    <div class="dialog-line-shadow"></div>
    <div class="claim-container">
        <md-content class="claim-text">{{claim.name}}</md-content>
        <md-content class="md-scrollbar claim-scrollbar">{{claim.description}}</md-content>

        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-field>
                    <label for="claimer_сity">Изменить статус</label>
                    <md-select name="сity" id="claimer_сity">
                        <md-option v-for="(status, index) in statusClaims" :key="index" :value="status">{{ status }}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-field>
                    <label for="claim_name">Перенаправить</label>
                    <md-input id="claim_name" />
                </md-field>
            </div>
        </div>
    </div>
    <div class="dialog-line"></div>
    <div class="claim-container">
        <md-content class="claim-text">{{claim.firstname}} {{claim.middlename}} {{claim.lastname}}</md-content>
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <div class="md-list-item-text">
                    <span>{{claim.phone}}</span>
                    <span class="color-light-grey">Телефон</span>
                </div>  
            </div>
            <div class="md-layout-item">
                <div class="md-list-item-text">
                    <span>{{claim.email}}</span>
                    <span class="color-light-grey">E-mail</span>
                </div> 
            </div>
        </div>

    </div>

    <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog">{{ $t("common.close") }}</md-button>
        <!-- <md-button class="md-primary" @click="updateStatusClaim">{{ $t("common.edit") }}</md-button> -->
    </md-dialog-actions>

    </md-dialog>
</template>
    
<script lang="ts">
    import {Component, Provide, Vue, Prop} from 'vue-property-decorator';
    import {statusDialog} from '@/domain/util/interface/CommonInterface';

    @Component({})
    export default class UpdateStatusClaims extends Vue {

        @Prop()
        public claim: any;

        @Provide()
        public statusDialog = statusDialog;

        @Provide()
        public statusClaims: string[] = [
            'не подтверждено',
            'принято',
            'отправить вниз',
            'отправить вверх',
        ];

        public closeDialog() {
            statusDialog.show = false;
        }

        // public updateStatusClaim() {

        // }

    }
</script>
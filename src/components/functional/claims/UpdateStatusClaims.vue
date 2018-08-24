<template>
    <!-- Диалоговое окно-->
    <md-dialog :md-active.sync="statusDialog.show" class="customer-dialog" style="width: 640px !important;">

        <div style="padding: 16px;">
            <div><md-content><div class="color-light-grey">Информация о заявке</div></md-content></div>
            <div style="padding: 0px 64px;">
                <div style="padding: 8px 0px;">
                    <md-content>{{claim.name}}</md-content>
                </div>
                <div style="padding: 8px 0px;">
                    <md-content>{{claim.description}}</md-content>
                </div>
            </div>
        </div>

        <div style="padding: 16px; padding-top: 0;">
            <div><md-content><div class="color-light-grey">Статус заявки</div></md-content></div>
            <div class="row" style="padding: 0 64px;">
                <div class="col-sm-6" style="padding-right: 16px;">
                    <md-field>
                        <label for="claimer_сity">Изменить статус</label>
                        <md-select name="сity" id="claimer_сity">
                            <md-option v-for="(status, index) in statusClaims" :key="index" :value="status">{{ status }}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="col-sm-6" style="padding-left: 16px;">
                    <md-field>
                        <label for="claim_name">Перенаправить</label>
                        <md-input :name="$t('validation.name')" id="claim_name" />
                    </md-field>
                </div>                              
            </div>
        </div>

        <div class="dialog-line"></div>

        <div style="padding: 0px 16px;">
            <div><md-content><div class="color-light-grey">Зявитель</div></md-content></div>
            <div style="padding: 0px 64px;">
                <div style="padding: 8px 0px;">
                    <md-content>{{claim.firstname}} {{claim.middlename}} {{claim.lastname}}</md-content>
                </div>
                <div class="row">
                <!-- <div style="padding: 8px 0;"> -->
                    <div class="col-sm-6">
                    <md-content>
                        <div class="md-list-item-text">
                            <span>{{claim.phone}}</span>
                            <span class="color-light-grey">Телефон</span>
                        </div>                                                
                    </md-content>
                    </div>
                <!-- </div> -->
                <!-- <div style="padding: 8px 0;"> -->
                    <div class="col-sm-6">
                    <md-content>
                        <div class="md-list-item-text">
                            <span>{{claim.email}}</span>
                            <span class="color-light-grey">E-mail</span>
                        </div>                                                
                    </md-content>
                    </div>
                </div>
                <!-- </div> -->
            </div>
        </div>

        <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog">{{ $t("common.close") }}</md-button>
            <md-button class="md-primary" @click="updateStatusClaim">{{ $t("common.edit") }}</md-button>
        </md-dialog-actions>

    </md-dialog>
</template>
    
<script lang="ts">
    import {Component, Provide, Vue, Prop} from 'vue-property-decorator';
    import {statusDialog} from '@/domain/util/interface/CommonInterface';

    @Component()
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
            'отправить вверх'
        ];

        public closeDialog() {
            statusDialog.show = false;
        }

        public updateStatusClaim() {

        }

    }
</script>
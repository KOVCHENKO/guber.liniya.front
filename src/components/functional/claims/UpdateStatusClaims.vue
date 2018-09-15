<template>
    <!-- Диалоговое окно-->
    <md-dialog :md-active.sync="statusDialog.show" class="customer-dialog" style="width: 640px !important; max-height: 100%;">
    
    <md-dialog-title>Изменить статус заявки</md-dialog-title>
    <div class="dialog-line-shadow"></div>
    <div class="claim-container claim-content">
        <md-content class="claim-text">{{claim.name}}</md-content>
        <md-content class="md-scrollbar claim-scrollbar">{{claim.description}}</md-content>

        <div class="md-layout md-gutter">
            <div class="row">
                <div class="col-sm-6">
                    <div class="md-layout-item">
                        <span v-if="claim.status === 'created'">
                            <md-field>
                                <label>Изменить статус</label>
                                <md-select name="status" id="claimer_status" v-model="statusData">
                                    <md-option v-for="(status, index) in statusClaims" :key="index" :value="index">{{ status }}</md-option>
                                </md-select>
                            </md-field>
                        </span>
                        <span v-if="claim.status === 'assigned'"> 
                            <md-checkbox v-model="booleanAssigned" class="md-primary">
                                <md-content class="claim-text claim-check-text">Заявка выполнена</md-content>
                            </md-checkbox>
                            <br>
                            <file-upload :claim="claim"></file-upload>
                        </span>
                        <span v-if="claim.status === 'executed'">
                            <i class="fas fa-check fa-2x fa-check-green"></i>
                            <md-content class="claim-text claim-check-text">Заявка выполнена</md-content>

                        </span>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="md-layout-item" v-if="statusData === 'redirect'">
                        <md-field>
                            <label>Перенаправить</label>
                            <md-select name="child_organization" id="child_organization" v-model="childOrganization">
                                <md-option v-for="organization in organizationState.organizations" :key="organization.id" :value="organization.id">{{ organization.name }}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
            </div>
            <md-field style="margin-bottom: 0px" v-if="statusData === 'rejected' || claim.status === 'assigned' ">
                <label>Комментарий</label>
                <md-textarea v-model="comment"></md-textarea>
            </md-field>
        </div>
    </div>
    <div class="dialog-line"></div>
    <div class="claim-container claim-content">
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
        <md-button class="md-primary" @click="updateStatusClaim">{{ $t("common.edit") }}</md-button>
    </md-dialog-actions>

    </md-dialog>
</template>
    
<script lang="ts">
    import {Component, Provide, Vue, Prop, Watch} from 'vue-property-decorator';
    import {statusDialog} from '@/domain/util/interface/CommonInterface';
    import {Action, State} from 'vuex-class';
    import UserState from '../../../store/common/user/types';
    import OrganizationState from '../../../store/functional/organization/types';
    import {baseUrl} from '@/globals';
    import CommentState from '../../../store/functional/comment/types';
    import FileUpload from '@/components/util/upload/FileUpload.vue';

    @Component({
        components: {FileUpload},
    })
    export default class UpdateStatusClaims extends Vue {

        @Prop() public claim: any;

        @Action public submitConfirmationFile;

        @Provide() public statusDialog = statusDialog;

        @Provide() public statusData: string = '';

        @Provide() public comment: string = '';

        @State('user') public userState!: UserState;

        @State('organization') public organizationState!: OrganizationState;

        @State('comment') public commentState!: CommentState;

        @Provide()
        public statusClaims: any = {
            created: 'Не принятая',
            assigned: 'Принять в работу',
            redirect: 'Переадресовать',
            rejected: 'Отказать',
        };

        @Provide() public booleanAssigned: boolean = false;

        @Provide() public childOrganization: number = -1;

        @Action public changeStatusClaim;

        @Action public getAllClaimsOfOrganization;

        @Action public changeOrganization;

        @Action public createComment;

        // TODO: получение текущего статуса заявки, когда открывается окно
        @Watch('statusDialog.show')
        public onChangedStatusDialog(val: string, oldVal: string) {
            this.statusData = this.claim.status;
        }

        public closeDialog() {
            statusDialog.show = false;
        }

        // TODO: логика.
        public updateStatusClaim() {
            // Заявка выполнена. Изменяем статус заявки с assigned на executed. Добавляем комментарий
            if (this.booleanAssigned === true && this.claim.status === 'assigned') {
                this.changeStatusClaim({id : this.claim.id, status : 'executed' }).then(() => {
                    this.getAllClaimsOfOrganization({organization_id : this.userState.user.organization.id });
                    statusDialog.show = false;

                    this.commentState.comment = {
                        text: this.comment,
                        claim_id: this.claim.id,
                        status: 'executed',
                    };
                    this.createComment();
                });
                return;
            }
            // Если статус не изменили
            if (this.statusData === this.claim.status) {
                return;
            }
            // Приянть в работу. Изменяем статус заявки на assigned
            if (this.statusData === 'assigned') {
                this.changeStatusClaim({id : this.claim.id, status : this.statusData }).then(() => {
                    this.getAllClaimsOfOrganization({organization_id : this.userState.user.organization.id });
                    statusDialog.show = false;
                });
                return;
            }
            // Перенаправить другой организации. Изменяем прикрепленную организацию.
            if (this.statusData === 'redirect') {
                this.changeOrganization({id : this.claim.id, id_old_organization : this.userState.user.organization.id,
                        id_new_organization : this.childOrganization }).then(() => {
                    this.getAllClaimsOfOrganization({organization_id : this.userState.user.organization.id });
                    statusDialog.show = false;
                });
                return;
            }
            // Отказаться. Изменяем статус заявки на rejected. Добавляем комментарий
            if (this.statusData === 'rejected') {
                this.changeStatusClaim({id : this.claim.id, status : this.statusData }).then(() => {
                    this.getAllClaimsOfOrganization({organization_id : this.userState.user.organization.id });
                    statusDialog.show = false;

                    this.commentState.comment = {
                        text: this.comment,
                        claim_id: this.claim.id,
                        status: this.statusData,
                    };
                    this.createComment();
                });
                return;
            }
        }

    }
</script>
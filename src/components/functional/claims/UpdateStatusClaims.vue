<template>
    <div class="modal fade" id="updateStatusClaims" tabindex="-1" role="dialog"
         aria-labelledby="updateStatusClaimsLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Заявка</h5>
                    <button type="button" class="close" aria-label="Close" @click="closeDialog">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
					<ul class="nav nav-tabs" id="tabClaims" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="true">Информация о заявке</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="change-tab" data-toggle="tab" href="#change" role="tab" aria-controls="change" aria-selected="false">Изменить заявку</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="tabClaimsContent">
                        <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
                            <div class="cst-container">
                                <div class="row">
                                    <div class="col-sm-12 cst-col-container">
                                        <div>
                                            <h6>Описание:</h6>
                                            <p>{{claim.description}}</p>
                                        </div>
                                        <div>
                                            <audio class="cst-audio" controls>
                                                <source :src="claim.link" type="audio/mpeg">
                                            </audio>
                                            <p class="cst-float-right">{{ claim.created_at }}</p>
                                        </div>
                                        <div class="cst-clear"></div>
                                        <hr>                                
                                        <div>
                                            <h6>Данные заявителя:</h6>
                                            <p>{{ fullname }}</p>
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <p><span class="color-light-grey">Телефон:</span><br> {{phone}}</p>
                                                </div>
                                                <div class="col-sm-4">
                                                    <p><span class="color-light-grey">E-mail:</span><br> {{email}}</p>
                                                </div>
                                                <div class="col-sm-4">
                                                    <p><span class="color-light-grey">Адрес:</span><br> {{address}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                        
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" aria-label="Close" @click="closeDialog">{{ $t("common.close") }}</button>
                            </div> 
                        </div>
                        <div class="tab-pane fade" id="change" role="tabpanel" aria-labelledby="change-tab">
                            <div class="cst-container">
                                <div class="row">
                                    <div class="col-sm-6 cst-col-container">
                                        <!--Создана-->
                                        <span v-if="checkCreateClaim">
                                            <h6>Изменить статус:</h6>
                                            <select class="form-control" name="status" id="claimer_status" v-model="statusData">
                                                <option v-for="(status, index) in statusClaims" :key="index" :value="index">{{ status }}</option>
                                            </select>
                                            <br>
                                        </span>

                                        <!--Создана и переназначена другой организации-->
                                        <span v-if="checkCreateClaimAndReassign">
                                            <h6>Заявка назначена другой организации:</h6>
                                            <p>{{claim.responsible_organization[0].name}}</p>
                                        </span>

                                        <!--Назначена / Взята в работу-->
                                        <span v-if="checkAssignedClaim">
                                            <h6>Изменить статус:</h6>
                                            <select class="form-control" name="status" id="claimer_status" v-model="statusData">
                                                <option>Изменить статус</option>
                                                <option value="redirect">Переадресовать</option>
                                                <option value="rejected">Отказать</option>
                                            </select>
                                            <br>
                                            <!--Возможность выполнить заявку-->
                                            <div class="custom-control custom-checkbox" v-if="checkPossibilityExecute">
                                                <input id="generalChekbox" type="checkbox" class="custom-control-input" v-model="booleanAssigned">
                                                <label class="custom-control-label" for="generalChekbox"><h6>Заявка выполнена</h6></label>
                                            </div>
                                        </span>

                                        <!--Выполнена-->
                                        <span v-if="checkExecute">
                                            <h6><i class="fas fa-check fa-2x fa-check-green"></i>Заявка выполнена</h6>
                                        </span>

                                    </div>
                                    <div class="col-sm-6 cst-col-container">
                                        <!--Перенаправить заявку в другую организацию-->
                                        <span v-if="checkPossibilityRedirect">
                                            <h6>Перенаправить:</h6>
                                            <select class="form-control" name="child_organization" id="child_organization" v-model="childOrganization">
                                                <option v-for="organization in organizationState.organizations" :key="organization.id" :value="organization.id">{{ organization.name }}</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                <!--Возможность оставить комментарий и прикрепить файл к заявке-->
                                <span v-if="checkAddingInfoByClaim">
                                    <file-upload :claim="claim"></file-upload>
                                    <br>                                    
                                    <div class="row">
                                        <div class="col-sm-12 cst-col-container">
                                            <h6>Комментарий:</h6>
                                            <textarea class="form-control" id="claim_comment" v-model="commentState.comment.text" rows="3"></textarea>
                                        </div>
                                    </div>
                                </span>
                            </div>
                            <div class="modal-footer"> 
                                <button type="button" class="btn btn-secondary" aria-label="Close" @click="closeDialog">{{ $t("common.close") }}</button>
                                <button type="button" class="btn btn-primary" @click="updateStatusClaim">{{ $t("common.edit") }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue, Prop, Watch} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import UserState from '../../../store/common/user/types';
    import OrganizationState from '../../../store/functional/organization/types';
    import {baseUrl} from '@/globals';
    import CommentState from '../../../store/functional/comment/types';
    import FileUpload from '@/components/util/upload/FileUpload.vue';
    import AppService from '@/domain/services/common/AppService';

    @Component({
        components: {FileUpload},
    })
    export default class UpdateStatusClaims extends Vue {

        @Prop() public claim: any;

        @Prop() public dataFilter: any;

        @Action public submitConfirmationFile;

        @Provide() public statusData: string = '';

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

        @Action public getAllClaimsOfOrganization2;

        @Action public changeOrganization;

        @Action public createComment;

        get fullname() {
            if (this.claim.hasOwnProperty('applicant')) {
                const key = ['firstname', 'middlename', 'lastname'];
                return AppService.assembleString(this.claim.applicant, key);
            } else {
                return AppService.assembleString({}, []);
            }
        }

        get address() {
            if (this.claim.hasOwnProperty('address')) {
                const key = ['city', 'district', 'street', 'building'];
                return AppService.assembleString(this.claim.address, key, ', ');
            } else {
                return AppService.assembleString({}, []);
            }
        }

        get phone() {
            if (this.claim.hasOwnProperty('applicant')) {
                const key = ['phone'];
                return AppService.assembleString(this.claim.applicant, key);
            } else {
                return AppService.assembleString({}, []);
            }
        }

        get email() {
            if (this.claim.hasOwnProperty('applicant')) {
                const key = ['email'];
                return AppService.assembleString(this.claim.applicant, key);
            } else {
                return AppService.assembleString({}, []);
            }
        }

        get checkCreateClaim() {
            return (this.claim.status === 'created'
                && this.claim.organization_id === this.userState.user.organization.id);
        }

        get checkCreateClaimAndReassign() {
            return (this.claim.organization_id !== this.userState.user.organization.id);
        }

        get checkAssignedClaim() {
            return (this.claim.status === 'assigned'
                && this.claim.organization_id === this.userState.user.organization.id);
        }

        get checkPossibilityExecute() {
            return (!(this.statusData === 'redirect' || this.statusData === 'rejected'));
        }

        get checkExecute() {
            return (this.claim.status === 'executed');
        }

        get checkPossibilityRedirect() {
            return (this.statusData === 'redirect');
        }

        get checkAddingInfoByClaim() {
            return ((this.statusData === 'rejected' || this.claim.status === 'assigned')
                && this.claim.organization_id === this.userState.user.organization.id);
        }

        // // TODO: получение текущего статуса заявки, когда открывается окно
        // @Watch('statusDialog.show')
        // public onChangedStatusDialog(val: string, oldVal: string) {
        //     this.statusData = this.claim.status;
        // }
        public mounted() {
            const self = this;
            $('#updateStatusClaims').on('shown.bs.modal', () => {
                self.statusData = self.claim.status;
            });
        }

        public closeDialog() {
            $('#updateStatusClaims').modal('hide');
            $('#tabClaims li:first-child a').tab('show');
        }

        // TODO: логика.
        public updateStatusClaim() {
            // Заявка выполнена. Изменяем статус заявки с assigned на executed. Добавляем комментарий
            if (this.booleanAssigned === true && this.claim.status === 'assigned') {
                this.changeStatusClaim({id : this.claim.claim_id, status : 'executed' }).then(() => {
                    this.getAllClaimsOfOrganization2(this.dataFilter);
                    this.closeDialog();

                    this.commentState.comment.claim_id = this.claim.claim_id;
                    this.commentState.comment.status = this.statusData;

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
                this.changeStatusClaim({id : this.claim.claim_id, status : this.statusData }).then(() => {
                    this.getAllClaimsOfOrganization2(this.dataFilter);
                    this.closeDialog();
                });
                return;
            }
            // Перенаправить другой организации. Изменяем прикрепленную организацию.
            if (this.statusData === 'redirect') {
                this.changeOrganization({id : this.claim.claim_id, id_old_organization : this.userState.user.organization.id,
                        id_new_organization : this.childOrganization }).then(() => {
                    this.getAllClaimsOfOrganization2(this.dataFilter);
                    this.closeDialog();
                });
                return;
            }
            // Отказаться. Изменяем статус заявки на rejected. Добавляем комментарий
            if (this.statusData === 'rejected') {
                this.changeStatusClaim({id : this.claim.claim_id, status : this.statusData }).then(() => {
                    this.getAllClaimsOfOrganization2(this.dataFilter);
                    this.closeDialog();

                    this.commentState.comment.claim_id = this.claim.claim_id;
                    this.commentState.comment.status = this.statusData;

                    this.createComment();
                });
                return;
            }
        }

    }
</script>
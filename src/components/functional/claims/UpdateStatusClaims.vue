<template>
    <div class="modal fade" id="updateStatusClaims" tabindex="-1" role="dialog"
         aria-labelledby="updateStatusClaimsLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content cst-md-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close" @click="closeDialog">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
					<ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="true">Информация о заявке</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="change-tab" data-toggle="tab" href="#change" role="tab" aria-controls="change" aria-selected="false">Изменить заявку</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
                            <div class="claim-container claim-content">
                                <p class="md-scrollbar claim-scrollbar">{{claim.description}}</p>
                                <div class="row">
                                    <div class="col-sm-3 clearfix">
                                        {{ claim.created_at }}
                                    </div>
                                    <div class="col-sm-9 clearfix">
                                        <audio style="width: 100%;" controls>
                                            <source :src="claim.link" type="audio/mpeg">
                                        </audio>
                                    </div>
                                </div>
                                <div class="claim-container claim-content" style="padding: 0px !important;">
                                    <p class="claim-text" v-if="claim.firstname === '' && claim.middlename === '' && claim.lastname === ''">Нет данных</p>
                                    <p class="claim-text" v-else>{{claim.firstname}} {{claim.middlename}} {{claim.lastname}}</p>
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
                                        <div class="md-layout-item">
                                            <div class="md-list-item-text">
                                                <span>{{ address }}</span>
                                                <span class="color-light-grey">Адрес</span>
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
                            <div class="claim-container claim-content" style="margin-top: 0px !important;">
                                <div class="row">
                                    <div class="col-sm-6 padding-right">
                                        <div class="md-layout-item">
                                            <!--Создана-->
                                            <span v-if="claim.status === 'created' && claim.hasOwnProperty('pivot') && claim.pivot.organization_id === userState.user.organization.id">
                                                <label>Изменить статус</label>
                                                <select class="form-control" name="status" id="claimer_status" v-model="statusData">
                                                    <option v-for="(status, index) in statusClaims" :key="index" :value="index">{{ status }}</option>
                                                </select>
                                            </span>

                                            <!--Создана и переназначена другой организации-->
                                            <span v-if="claim.hasOwnProperty('pivot') && claim.pivot.organization_id !== userState.user.organization.id">
                                                <p>Заявка назначена другой организации:
                                                    <br>
                                                    {{claim.responsible_organization[0].name}}</p>
                                            </span>

                                            <!--Назначена / Взята в работу-->
                                            <span v-if="claim.status === 'assigned' && claim.hasOwnProperty('pivot') && claim.pivot.organization_id === userState.user.organization.id">
                                                <label>Изменить статус</label>
                                                <select class="form-control" name="status" id="claimer_status" v-model="statusData">
                                                    <option>Изменить статус</option>
                                                    <option value="redirect">Переадресовать</option>
                                                    <option value="rejected">Отказать</option>
                                                </select>
                                                <div class="custom-control custom-checkbox">
                                                    <input id="generalChekbox" type="checkbox" class="custom-control-input" v-model="booleanAssigned" v-if="!(statusData == 'redirect' || statusData == 'rejected')">
                                                    <label class="custom-control-label" for="generalChekbox">Заявка выполнена</label>
                                                </div>
                                            </span>

                                            <!--Выполнена-->
                                            <span v-if="claim.status === 'executed'">
                                                <i class="fas fa-check fa-2x fa-check-green"></i>
                                                <p class="claim-text claim-check-text">Заявка выполнена</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 padding-left">
                                        <div class="md-layout-item" v-if="statusData === 'redirect'">
                                            <label>Перенаправить</label>
                                            <select class="form-control" name="child_organization" id="child_organization" v-model="childOrganization">
                                                <option v-for="organization in organizationState.organizations" :key="organization.id" :value="organization.id">{{ organization.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="(statusData === 'rejected' || claim.status === 'assigned') && claim.hasOwnProperty('pivot') && claim.pivot.organization_id === userState.user.organization.id">
                                    <file-upload :claim="claim"></file-upload>
                                    <label for="claim_comment">Комментарий</label>
                                    <textarea class="form-control" id="claim_comment" v-model="commentState.comment.text" rows="3"></textarea>
                                </div>
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

    @Component({
        components: {FileUpload},
    })
    export default class UpdateStatusClaims extends Vue {

        @Prop() public claim: any;

        @Prop() public sortByData: any;

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

        @Action public changeOrganization;

        @Action public createComment;

        get address() {
            return (this.claim.hasOwnProperty('address') && this.claim.address.hasOwnProperty('district')
                && this.claim.address.hasOwnProperty('location') ) ? this.claim.address.district + ' / ' +
                this.claim.address.location : '';
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
            $('#myTab li:first-child a').tab('show');
        }

        // TODO: логика.
        public updateStatusClaim() {
            // Заявка выполнена. Изменяем статус заявки с assigned на executed. Добавляем комментарий
            if (this.booleanAssigned === true && this.claim.status === 'assigned') {
                this.changeStatusClaim({id : this.claim.id, status : 'executed' }).then(() => {
                    this.getAllClaimsOfOrganization({
                        organization_id: this.userState.user.organization.id,
                        dispatchStatusFilter: 'all',
                        search: '', sortByData: this.sortByData,
                    });
                    this.closeDialog();

                    this.commentState.comment.claim_id = this.claim.id;
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
                this.changeStatusClaim({id : this.claim.id, status : this.statusData }).then(() => {
                    this.getAllClaimsOfOrganization({
                        organization_id: this.userState.user.organization.id,
                        dispatchStatusFilter: 'all',
                        search: '', sortByData: this.sortByData,
                    });
                    this.closeDialog();
                });
                return;
            }
            // Перенаправить другой организации. Изменяем прикрепленную организацию.
            if (this.statusData === 'redirect') {
                this.changeOrganization({id : this.claim.id, id_old_organization : this.userState.user.organization.id,
                        id_new_organization : this.childOrganization }).then(() => {
                    this.getAllClaimsOfOrganization({
                        organization_id: this.userState.user.organization.id,
                        dispatchStatusFilter: 'all',
                        search: '', sortByData: this.sortByData,
                    });
                    this.closeDialog();
                });
                return;
            }
            // Отказаться. Изменяем статус заявки на rejected. Добавляем комментарий
            if (this.statusData === 'rejected') {
                this.changeStatusClaim({id : this.claim.id, status : this.statusData }).then(() => {
                    this.getAllClaimsOfOrganization({
                        organization_id: this.userState.user.organization.id,
                        dispatchStatusFilter: 'all',
                        search: '', sortByData: this.sortByData,
                    });
                    this.closeDialog();

                    this.commentState.comment.claim_id = this.claim.id;
                    this.commentState.comment.status = this.statusData;

                    this.createComment();
                });
                return;
            }
        }

    }
</script>

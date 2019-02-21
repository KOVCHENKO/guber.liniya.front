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
                    <div class="cst-container">
                        <div class="row">
                            <div class="col-sm-12 cst-col-container">
                                <div>
                                    <h6>Описание:</h6>
                                    <p>{{claimState.claim.description}}</p>
                                </div>
                                <div>
                                    <audio class="cst-audio" controls>
                                        <source :src="claimState.claim.link" type="audio/mpeg">
                                    </audio>
                                    <p class="cst-float-right">{{ claimState.claim.created_at }}</p>
                                </div>
                                <div class="cst-clear"></div>
                                <div>
                                    <h6>Проблема:</h6>
                                    <p>{{claimState.claim.problem.name}}</p>
                                </div>
                                <hr>                                
                                <div>
                                    <h6>Данные заявителя:</h6>
                                    <p>{{ fullname }}</p>
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <p><span class="color-light-grey">Телефон:</span><br> {{claimState.claim.phone}}</p>
                                        </div>
                                        <div class="col-sm-4">
                                            <p><span class="color-light-grey">E-mail:</span><br> {{claimState.claim.email}}</p>
                                        </div>
                                        <div class="col-sm-4">
                                            <p><span class="color-light-grey">Адрес:</span><br> {{address}}</p>
                                        </div>
                                    </div>
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
    import {statusDialogOfSecondLevel} from '@/domain/util/interface/CommonInterface';
    import {State} from 'vuex-class';
    import ClaimState from '@/store/functional/claim/types';
    import AppService from '@/domain/services/common/AppService';

    @Component
    export default class ClaimInfo extends Vue {

        @State('claim') public claimState!: ClaimState;

        @Provide() public statusDialogOfSecondLevel = statusDialogOfSecondLevel;

        get fullname() {
            const key = ['firstName', 'middleName', 'lastName'];
            return AppService.assembleString(this.claimState.claim, key);
        }

        get address() {
            if (this.claimState.claim.hasOwnProperty('address')) {
                const key = ['district', 'location'];
                return AppService.assembleString(this.claimState.claim.address, key, ', ');
            } else {
                return AppService.assembleString({}, []);
            }
        }

        public closeDialog() {
            $('#claimInfo').modal('hide');
        }

    }
</script>

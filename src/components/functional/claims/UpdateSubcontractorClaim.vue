<template>
    <div class="modal fade" id="updateSubcontractorClaim" tabindex="-1" role="dialog"
         aria-labelledby="updateSubcontractorClaimLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Заявка</h5>
                    <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                            
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
                                    <h6>Статус:</h6>
                                    <!--Возможность выполнить заявку-->
                                    <div class="custom-control custom-checkbox" v-if="checkOpened">
                                        <input id="generalChekbox" type="checkbox" class="custom-control-input" v-model="booleanOpened">
                                        <label class="custom-control-label" for="generalChekbox"><h6>Заявка выполнена</h6></label>
                                    </div>

                                    <!--Выполнена-->
                                    <span v-if="checkClosed">
                                        <h6><i class="fas fa-check fa-2x fa-check-green"></i>Заявка выполнена</h6>
                                    </span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" aria-label="Close" data-dismiss="modal">{{ $t("common.close") }}</button>
                        <button type="button" class="btn btn-primary" @click="updateSubcontractorClaim" v-if="checkOpened">{{ $t("common.edit") }}</button>
                    </div> 

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue, Prop, Watch} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';


    @Component
    export default class UpdateSubcontractorClaim extends Vue {

        @Prop() public subcontractor: any;

        @Prop() public claim: any;

        @Provide() public booleanOpened: boolean = false;

        @Action public getSubcontractorUpdate;

        get checkOpened() {
            return this.subcontractor.status === 'opened';
        }

        get checkClosed() {
            return this.subcontractor.status === 'closed';
        }

        public updateSubcontractorClaim() {
            if (this.booleanOpened) {
                this.getSubcontractorUpdate({ id: this.subcontractor.id }).then(() => {
                    this.subcontractor.status = 'closed';
                });
            }
            $('#updateSubcontractorClaim').modal('hide');
        }

    }
</script>

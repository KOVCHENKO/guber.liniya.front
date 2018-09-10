<template>
    <div>
        <!-- Модальное окно - подтверждение действия -->
        <div class="modal fade" id="sureWindow" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{ title }}</h4>
                    </div>
                    <div class="modal-body">
                        <p>{{ text }}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" @click="okClick" type="button" >Да</button>
                        <button class="btn btn-info" @click="cancelClick" type="button" >Нет</button>
                    </div>
                </div>
            </div>
        </div>
        <!--End of modal-->
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {OkCancelModalProperties} from '@/domain/util/interface/CommonInterface';


    @Component
    export default class OkCancelModal extends Vue {
        @Provide() public action: string = '';

        @Provide() public title: string = OkCancelModalProperties.title;
        @Provide() public text: string = OkCancelModalProperties.text;

        public okClick() {
            $('#sureWindow').modal('hide');
            OkCancelModalProperties.okAction();
        }

        public cancelClick() {
            $('#sureWindow').modal('hide');
        }
    }
</script>
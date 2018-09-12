<template>
    <div>
        <!-- Модальное окно - подтверждение действия -->
        <div class="modal fade" id="sureWindow" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content cst-md-content">
                    <div class="modal-header">
                        <h4 class="modal-title cst-md-title">{{ title }}</h4>
                    </div>
                    <div class="modal-body">
                        <p style="margin: 0px;">{{ text }}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="cst-md-btn" @click="okClick" type="button" >Да</button>
                        <button class="cst-md-btn" @click="cancelClick" type="button" >Нет</button>
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
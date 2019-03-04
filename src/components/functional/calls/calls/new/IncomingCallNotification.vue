<template>
    <!-- Модальное окно на входящий звонок -->
    <div class="modal fade" id="incomingCallNotificationModal" tabindex="-1" role="dialog" aria-labelledby="incomingCallNotificationModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog notificationModal" role="document">
            <div class="modal-content">
                <div class="notificationModalHead">
                    <div>Входящий звонок</div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="notificationModalBody">                    
                    <div>
                        Телефон: {{ callState.incomingCall.phone }}
                    </div>
                    <div>
                        Заявитель: {{ applicantState.applicant.lastname}}
                    </div>
                </div>
                <div class="notificationModalFooter">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Проигнорировать</button>
                    <button type="button" class="btn btn-primary" @click="acceptCall">Принять звонок</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {State} from 'vuex-class';
    import CallState from '@/store/functional/call/types';
    import ApplicantState from '@/store/functional/applicant/types';
    import {socket} from '@/bootstrap';

    @Component
    export default class IncomingCallNotification extends Vue {
        @State('call') public callState!: CallState;

        // TODO: Необходимо на основании звонка вычислять, существует ли заявитель по данному номеру телефона или это новый звонящий
        @State('applicant') public applicantState!: ApplicantState;

        // Принять звонок:
        // 1. Emit событие на закрытие окошка у других принимающих
        // 2. Закрыть окно с уведоилением о новом звонке
        // 3. Открыть модальное окно с заполнением нового звонка
        private acceptCall() {
            socket.emit('accept_call', {
                // TODO: Передавать информацию для логирования (user_id, user_email, created_at, phone)
                user_id: '',
                user_email: '',
                created_at: '',
                phone: '',
            });

            $('#incomingCallNotificationModal').modal('hide');
            $('#resolveNewCall').modal('show');
        }

    }
</script>

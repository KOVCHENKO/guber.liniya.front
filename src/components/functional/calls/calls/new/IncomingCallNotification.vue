<template>
    <!-- Модальное окно на входящий звонок -->
    <div class="modal fade" id="incomingCallNotificationModal" tabindex="-1" role="dialog" aria-labelledby="incomingCallNotificationModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="incomingCallNotificationModalLabel">Входящий звонок</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        Телефон: {{ callState.incomingCall.phone }}
                    </div>
                    <div class="row">
                        Заявитель: {{ applicantState.applicant.lastname}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Проигнорировать</button>
                    <button type="button" class="btn btn-primary">Принять звонок</button>
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

    @Component
    export default class IncomingCallNotification extends Vue {
        @State('call') public callState!: CallState;

        // TODO: Необходимо на основании звонка вычислять, существует ли заявитель по данному номеру телефона или это новый звонящий
        @State('applicant') public applicantState!: ApplicantState;



    }
</script>

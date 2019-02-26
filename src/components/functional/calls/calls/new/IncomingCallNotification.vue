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
                    Дата:
                    Телефон:
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

    @Component
    export default class IncomingCallNotification extends Vue {

    }
</script>

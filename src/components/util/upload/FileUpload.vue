<template>
    <md-content class="claim-text claim-check-text">
        <span @click="attachFile">Выбрать файл</span>
        <md-button class="md-primary" @click="submitFile()">Отправить</md-button>
        <input id="file" v-show="false" ref="file" type="file" @change="processFile($event)"/>
        <span @click="attachFile">{{ fileName }}</span>
    </md-content>
</template>

<script>
    import SuccessNotifier from '../../../domain/util/notifications/SuccessNotifier';
    import ErrorNotifier from '../../../domain/util/notifications/ErrorNotifier';

    export default {
        data(){
            return {
                file: '',
                fileName: '',
            }
        },

        methods: {
            attachFile() {
                document.getElementById('file').click()
            },

            async submitFile() {
                const formData = new FormData();
                formData.append('file', this.file);

                try {
                    await axios.post(`${baseUrl}file/upload`, {
                            formData: formData,
                        }, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        },
                    );

                    SuccessNotifier.notify('Файл', 'Подтверждающий файл отправлен');
                } catch {
                    ErrorNotifier.notify();
                }

                // this.submitConfirmationFile({ file: this.file, claimId: this.claim.id });
            },

            processFile(event) {
                // console.log(this.$refs.file);
                console.log(this.$refs.file.files[0]);

                this.file = this.$refs.file.files[0];
                this.fileName = event.target.files[0].name;
            }
        }
    }
</script>

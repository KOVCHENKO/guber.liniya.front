<template>
    <div class="row">
        <div class="col-sm-3 cst-col-container">
            <button type="button" class="btn btn-light button-vertical-align" @click="submitFile()">Отправить</button>
        </div>
        <div class="col-sm-9 cst-col-container">
            <input id="file" ref="file" type="file" @change="processFile()"/>
            <span @click="attachFile">{{ fileName }}</span>
        </div>
    </div>
</template>

<script>
    import SuccessNotifier from '../../../domain/util/notifications/SuccessNotifier';
    import ErrorNotifier from '../../../domain/util/notifications/ErrorNotifier';
    import {baseUrl} from '@/globals';
    import axios from 'axios';

    export default {
        props: ['claim'],

        data() {
            return {
                file: '',
                fileName: '',
                fileStatus: 'statu'
            }
        },

        methods: {
            attachFile() {
                document.getElementById('file').click()
            },

            submitFile() {
                const formData = new FormData();
                formData.append('file', this.file);

                    axios.post(baseUrl + 'file/upload/' + this.claim.id , formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then(() => {
                        SuccessNotifier.notify('Файл', 'Подтверждающий файл отправлен');
                    }).catch(() => {
                        ErrorNotifier.notify();
                    });


                // this.submitConfirmationFile({ file: this.file, claimId: this.claim.id });
            },

            processFile(event) {
                this.file = this.$refs.file.files[0];
                this.fileName = event.target.files[0].name;
            }
        }
    }
</script>

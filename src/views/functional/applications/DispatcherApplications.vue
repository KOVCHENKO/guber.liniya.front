<template>
    <div>
        
        <div class="main-page">
            <datatable-customized
                    :columns="tableColumns"
                    :data="claimState.claims"
            ></datatable-customized>
        </div>

        <create-application></create-application>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import CreateApplication from '@/components/functional/applications/CreateApplication/CreateApplication.vue';
    import {Action, State} from 'vuex-class';
    import ClaimState from '../../../store/functional/claim/types';
    import {headings, plusButton} from '../../../domain/util/interface/CommonInterface';

    @Component({
        components: {
            DatatableCustomized,
            CreateApplication,
        },
    })
    export default class DispatcherApplications extends Vue {

        @Provide()
        public tableColumns = [
            {label: 'id', field: 'id'},
            {label: 'Наименование', field: 'name'},
            {label: 'Описание', field: 'description'},
            {label: 'Заявитель', representedAs: (row) => {
                    return `${row.firstname} ${row.middlename } ${row.lastname}`;
                }, interpolate: true},
        ];

        @State('claim')
        public claimState!: ClaimState;

        @Action('getAllClaims')
        public getAllClaims;

        constructor() {
            super();
            headings.title = 'Все заявки';
            plusButton.visible = true;
            plusButton.title = 'Добавить заявку';
        }

        public created() {
            this.getAllClaims();
        }

    }
</script>

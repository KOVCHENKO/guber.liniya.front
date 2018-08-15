<template>
    <div>
        <datatable-customized
                :columns="tableColumns"
                :data="userState.users"
        ></datatable-customized>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {headings, plusButton} from '../../../domain/util/interface/CommonInterface';
    import IWithRouter from '../../../domain/util/interface/IWithRoute';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';

    @Component({
        components: {
            DatatableCustomized,
        },
    })
    export default class SingleOrganizationUsers extends Vue implements IWithRouter {

        constructor() {
            super();

            plusButton.disabled = true;
            headings.title = 'Пользователи организации';
            headings.subtitle = '';
        }

        @Provide()
        public tableColumns = [
            {label: 'id', field: 'id'},
            {label: 'Логин', field: 'email'},
            {label: 'Пароль', field: 'password'},
        ];

        public created() {
            // noinspection TypeScriptUnresolvedVariable
        }

    }
</script>

<style scoped>

</style>
<template>
    <div>
        <datatable
                :columns="tableColumns"
                :data="userState.users"
        >
            <template slot-scope="{ row }">
                <tr>
                    <td>{{ row.email }}</td>
                    <td>
                        <div style="cursor: pointer;" @click="resetPassword(row)">
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                    </td>
                </tr>
            </template>
        </datatable>

        <create-specialist></create-specialist>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {headings, plusButton} from '../../../domain/util/interface/CommonInterface';
    import IWithRouter from '../../../domain/util/interface/IWithRoute';
    import DatatableCustomized from '../../../components/util/DatatableCustomized.vue';
    import {Action, State} from 'vuex-class';
    import UserState from '../../../store/common/user/types';
    import CreateSpecialist from '@/components/functional/organizations/SingleOrganizationUsers/CreateSpecialist.vue';

    @Component({
        components: {
            DatatableCustomized,
            CreateSpecialist,
        },
    })
    export default class SingleOrganizationUsers extends Vue implements IWithRouter {
        @Action('getSpecialistsOfOrganization')
        public getSpecialists;

        @State('user')
        public userState!: UserState;

        @Provide()
        public tableColumns = [
            {label: 'Логин', field: 'email'},
            {label: 'Сбросить пароль'},
        ];

        constructor() {
            super();
            plusButton.clickAction = this.addSpecialist;
            plusButton.visible = true;
            headings.title = 'Пользователи организации';
            headings.subtitle = '';
        }

        public created() {
            // noinspection TypeScriptUnresolvedVariable
            this.getSpecialists({organization_id: this.$route.params.id});
        }

        public addSpecialist() {
            $('#createSpecialistModal').modal('show');
        }

        public resetPassword() {

            // reset password
        }

    }
</script>

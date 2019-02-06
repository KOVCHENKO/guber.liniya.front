<template>

    <div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="applicant in applicantState.applicants" :key="applicant.id">
                    <td>{{ applicant.lastname }}</td>
                    <td>{{ applicant.firstname }}</td>
                    <td>{{ applicant.middlename }}</td>
                    <td>{{ applicant.phone }}</td>
                    <td>
                        <div style="cursor: pointer;" @click="choose(applicant)">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>

</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import IApplicant from '@/domain/entities/functional/interfaces/IApplicant';
    import {Action, State} from 'vuex-class';
    import ApplicantState from '@/store/functional/applicant/types';
    import ClaimState from '@/store/functional/claim/types';
    import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';

    @Component
    export default class ApplicantsList extends Vue {

        @Action public getApplicants;

        @State('applicant') public applicantState!: ApplicantState;
        @State('claim') public claimState!: ClaimState;

        @Provide()
        public tableColumns = [
            {label: 'Имя'},
            {label: 'Фамилия'},
            {label: 'Отчетство'},
            {label: 'Телефон'},
            {},
        ];

        public created() {
            this.getApplicants();
        }

        public choose(applicant: IApplicant) {
            this.claimState.claim.applicant = applicant;
            SuccessNotifier.notify('Выбран заявитель', `${applicant.lastname} ${applicant.firstname} ${applicant.middlename}`);
        }

    }
</script>

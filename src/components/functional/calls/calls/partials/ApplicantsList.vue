<template>

    <div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th colspan="5">
                        <input v-model="searchField" @input="throttledSearch" class="form-control input-search" placeholder="Поиск заявителя по ФИО, телефону">
                    </th>
                </tr>
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

        <paginator
                v-on:setAnotherPage="getApplicants({ search: searchField })"
        ></paginator>

    </div>

</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import IApplicant from '@/domain/entities/functional/interfaces/IApplicant';
    import {Action, State} from 'vuex-class';
    import ApplicantState from '@/store/functional/applicant/types';
    import ClaimState from '@/store/functional/claim/types';
    import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
    import Paginator from '@/components/functional/calls/calls/partials/Paginator.vue';
    import throttle from '@/store/util/operations/throttle';


    @Component({
        components: {
            Paginator,
        },
    })
    export default class ApplicantsList extends Vue {

        @Action public getApplicants;

        @State('applicant') public applicantState!: ApplicantState;
        @State('claim') public claimState!: ClaimState;

        @Provide() public searchField: string = '';

        @Provide()
        public tableColumns = [
            {label: 'Фамилия'},
            {label: 'Имя'},
            {label: 'Отчетство'},
            {label: 'Телефон'},
            {},
        ];

        public created() {
            this.getApplicants({
                search: this.searchField,
            });
        }

        public choose(applicant: IApplicant) {
            this.claimState.claim.applicant = applicant;
            SuccessNotifier.notify('Выбран заявитель', `${applicant.lastname} ${applicant.firstname} ${applicant.middlename}`);
        }

        public startSearch() {
            // Обнулить и поставить страницу №1
            this.applicantState.currentPage = 1;

            this.getApplicants({
                search: this.searchField,
            });
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }

    }
</script>

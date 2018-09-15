<template>
    <div class="modal fade" id="reclaimedModal" tabindex="-1" role="dialog"
         aria-labelledby="reclaimedModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content cst-md-content">
                <div class="modal-header">
                    <h4 class="modal-title cst-md-title" id="reclaimedModalLabel">
                        Поиск повторных звонков
                    </h4>
                </div>
                <div class="modal-body">
                    <md-tabs md-sync-route>
                        <md-tab id="tab-linked" md-label="По номеру телефона">
                            <datatable
                                    :columns="tableColumnsForClaimsByPhone"
                                    :data="claimState.previousClaims"
                            >
                                <template slot-scope="{ row }">
                                    <tr>
                                        <td>{{ row.created_at }}</td>
                                        <td>{{row.firstname}} {{row.middlename}} {{row.lastname}}</td>
                                        <td>{{ row.phone }}</td>
                                        <td>
                                            <div style="cursor: pointer;" @click="show(row)">
                                                <i class="far fa-eye"></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div style="cursor: pointer;" @click="choose(row)">
                                                <i class="fab fa-get-pocket"></i>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </datatable>
                        </md-tab>

                        <md-tab id="tab-comments" md-label="Все заявки">
                            <div class="main-page">
                                <input v-model="searchField" @input="throttledSearch" class="form-control" placeholder="Поиск по дате, заявителю, телефону">

                                <datatable
                                        :columns="tableColumnsForAllClaims"
                                        :data="claimState.claims"
                                >
                                    <template slot-scope="{ row }">
                                        <tr>
                                            <td>{{ row.created_at }}</td>
                                            <td>{{row.firstname}} {{row.middlename}} {{row.lastname}}</td>
                                            <td>{{ row.phone }}</td>
                                            <td>{{ row.address.district }} / {{ row.address.location }}</td>
                                            <td>
                                                <div style="cursor: pointer;" @click="show(row)">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div style="cursor: pointer;" @click="choose(row)">
                                                    <i class="fab fa-get-pocket"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                </datatable>


                                <datatable-custom-paginator
                                        v-on:setAnotherPage="getAllClaims({ dispatchStatus: $route.params.dispatch_status })"
                                ></datatable-custom-paginator>

                            </div>
                        </md-tab>
                    </md-tabs>

                </div>
                <div class="modal-footer">
                    <button type="button" class="cst-md-btn" data-dismiss="modal">{{ $t("common.close") }}</button>
                </div>
            </div>
        </div>

        <!--Информация по заявке-->
        <claim-info></claim-info>

    </div>
</template>

<script lang="ts">
    import DatatableCustomPaginator from '@/components/util/DatatableCustomPaginator.vue';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {State, Action} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import Claim from '../../../../domain/entities/functional/Claim';
    import Address from '../../../../domain/entities/functional/Address';
    import Problem from '../../../../domain/entities/functional/Problem';
    import ICall from '../../../../domain/entities/functional/interfaces/ICall';
    import throttle from '../../../../store/util/operations/throttle';
    import ClaimInfo from './ClaimInfo.vue';
    import {statusDialogOfSecondLevel} from '../../../../domain/util/interface/CommonInterface';
    import Call from '../../../../domain/entities/functional/Call';

    @Component({
        components: { DatatableCustomPaginator, ClaimInfo },
    })
    export default class Reclaimed extends Vue {
        @State('claim') public claimState!: ClaimState;

        @Action public searchClaim;
        @Action public getAllClaims;

        @Provide() public searchField: string = '';

        @Provide()
        public tableColumnsForClaimsByPhone = [
            {label: 'Дата'},
            {label: 'Заявитель'},
            {label: 'Телефон'},
            {label: ''},
        ];

        @Provide()
        public tableColumnsForAllClaims = [
            {label: 'Дата'},
            {label: 'Заявитель'},
            {label: 'Телефон'},
            {label: 'Адрес (район / адрес)'},
            {label: ''},
            {label: ''},
        ];

        public choose(claim) {
            // Сохранить значение ИД завки и передать в новую заявку
            const savedCall: ICall = this.claimState.claim.call;

            this.claimState.claim = new Claim(0, claim.name, claim.description, claim.firstname, claim.middlename,
                claim.lastname, claim.phone, claim.email, claim.link,
                claim.status, claim.dispatch_status, claim.id, [{}], [],
                new Address(claim.address.id, claim.address.district, claim.address.location),
                new Problem(claim.problem.id, claim.problem.name, claim.problem.description),
                savedCall);

            $('#reclaimedModal').modal('hide');
        }

        public show(row) {
            this.claimState.claim = new Claim(row.id, row.name, row.description,
                row.firstname, row.middlename, row.lastname, row.phone, '', row.link, '', '', null, [{}], row.comments,
                new Address(0, 'Астрахань', ''), new Problem(0, 'Выберите проблему', ''),
                new Call(0, '', '', '', 'success', 'in',  '', '', ''));

            statusDialogOfSecondLevel.show = true;
        }

        public startSearch() {
            if (this.searchField === '') {
                this.getAllClaims({ dispatchStatus: 'all' });
                return;
            }
            this.searchClaim({search: this.searchField, dispatchStatus: 'all' });
        }

        get throttledSearch() {
            return throttle(this.startSearch, 2000);
        }
    }
</script>

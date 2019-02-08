<template>
    <div class="modal fade" id="reclaimedModal" tabindex="-1" role="dialog"
         aria-labelledby="reclaimedModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Поиск повторных звонков</h5>
                    <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
					  <li class="nav-item">
						<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">По номеру телефона</a>
					  </li>
					  <li class="nav-item">
						<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Все заявки</a>
					  </li>
					</ul>
                    <div class="tab-content" id="myTabContent">
					  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="cst-container-common">
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
                                                <div class="container-icon" @click="show(row)">
                                                    <i class="far fa-eye"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="container-icon" @click="choose(row)">
                                                    <i class="fab fa-get-pocket"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                </datatable>
                            </div>
                      </div>
					  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="cst-container-common">
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
                                                <div class="container-icon" @click="show(row)">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="container-icon" @click="choose(row)">
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
                      </div>
					</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t("common.close") }}</button>
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
            {},
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
                claim.status, claim.dispatch_status, claim.id, claim.level, [{}], [],
                new Address(claim.address.id, claim.address.district, claim.address.location),
                new Problem(claim.problem.id, claim.problem.name, claim.problem.description),
                savedCall);

            $('#reclaimedModal').modal('hide');
        }

        public show(row) {
            this.claimState.claim = new Claim(row.id, row.name, row.description,
                row.firstname, row.middlename, row.lastname, row.phone, '', row.link, '', '', null, row.level, [{}],
                row.comments, new Address(0, 'Астрахань', ''),
                new Problem(row.problem.id, row.problem.name, row.problem.description),
                new Call(0, '', '', '', 'success', 'in',  '', '', ''));

            $('#claimInfo').modal('show');
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

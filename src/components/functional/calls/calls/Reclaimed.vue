<template>
    <div class="modal fade" id="reclaimedModal" tabindex="-1" role="dialog"
         aria-labelledby="reclaimedModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="reclaimedModalLabel">Поиск повторных звонков</h4>
                </div>
                <div class="modal-body">

                    <datatable
                            :columns="tableColumns"
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

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">{{ $t("common.close") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {State} from 'vuex-class';
    import ClaimState from '../../../../store/functional/claim/types';
    import Claim from '../../../../domain/entities/functional/Claim';
    import Address from '../../../../domain/entities/functional/Address';
    import Problem from '../../../../domain/entities/functional/Problem';
    import ICall from '../../../../domain/entities/functional/interfaces/ICall';

    @Component
    export default class Reclaimed extends Vue {
        @State('claim')
        public claimState!: ClaimState;

        @Provide()
        public tableColumns = [
            {label: 'Дата'},
            {label: 'Заявитель'},
            {label: 'Телефон'},
            {label: ''},
        ];

        public choose(claim) {
            // Сохранить значение ИД завки и передать в новую заявку
            const savedCall: ICall = this.claimState.claim.call;

            this.claimState.claim = new Claim(0, claim.name, claim.description, claim.firstname, claim.middlename,
                claim.lastname, claim.phone, claim.email, claim.link, claim.dispatch_status, claim.id,
                new Address(claim.address.id, claim.address.district, claim.address.location),
                new Problem(claim.problem.id, claim.problem.name, claim.problem.description),
                savedCall);

            $('#reclaimedModal').modal('hide');
        }

        public show() {
            // show claim
        }
    }
</script>

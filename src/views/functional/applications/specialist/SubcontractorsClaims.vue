<template>
    <div class="tab-pane fade show active" id="current" role="tabpanel" aria-labelledby="subcontractors_claims">

        <br>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col" v-for="(column, index) in tableColumns" :key="index" class="cst-col">{{column.label}} 
                        <span v-if="column.sort"><i class="fas fa-sort"></i></span>
                        <span v-if="column.icon"><i v-bind:class="[column.icon]"></i></span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(subcontractor, index) in organizationState.subcontractors" :key="index">
                    <td><span v-if="subcontractor.hasOwnProperty('claim')">{{ formatTime(subcontractor.claim[0].updated_at) }}</span></td>
                    <td>{{ subcontractor.description }}</td>
                    <!--<td><span v-if="subcontractor.hasOwnProperty('claim')">{{ subcontractor.claim[0].responsible_organization[0].name }}</span></td>-->
                    <td>{{ translatedSubcontractorStatus(subcontractor) }}</td>
                    <td>
                        <div class="container-icon">
                            <i class="fas fa-pencil-alt" @click="show(subcontractor)"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <update-subcontractor-claim :subcontractor="subcontractor" :claim="subcontractor.claim[0]"></update-subcontractor-claim>

    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import OrganizationState from '../../../../store/functional/organization/types';
    import TimeFormatter from '@/domain/util/formatters/TimeFormatter';
    import ClaimService from '@/domain/services/functional/claims/ClaimService';
    import UpdateSubcontractorClaim from '@/components/functional/claims/UpdateSubcontractorClaim.vue';
    import UserState from '../../../../store/common/user/types';

    @Component({
        components: {
            UpdateSubcontractorClaim,
        },
    })
    export default class SubcontractorsClaims extends Vue {

        @Action('getClaimsSubcontractors')
        public getClaimsSubcontractors;

        @State('organization')
        public organizationState!: OrganizationState;

        @State('user')
        public userState!: UserState;

        @Provide()
        public tableColumns = [
            {label: 'Дата', sort: false, icon: ''},
            {label: 'Описание', sort: false, icon: ''},
            {label: 'Организация', sort: false, icon: ''},
            {label: 'Статус', sort: false, icon: ''},
            {label: '', sort: false, icon: 'fas fa-cog'},
        ];

        @Provide()
        public subcontractor: {} = {
            status: '',
            claim: [{
                name: '',
                description: '',
                firstname: '',
                middlename: '',
                lastname: '',
                phone: '',
                status: '',
            }],
        };

        public created() {
            this.getClaimsSubcontractors({ organization_id : this.userState.user.organization.id });
        }

        public formatTime(timeField) {
            return TimeFormatter.formatTime(timeField);
        }

        public translatedSubcontractorStatus(subcontractor) {
            return ClaimService.addTranslatedSubcontractorStatus(subcontractor);
        }

        public show(row) {
            this.subcontractor = row;
            $('#updateSubcontractorClaim').modal('show');
        }

    }

</script>

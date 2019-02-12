<template>
    <div class="main-page">
        <ul class="nav nav-tabs" id="myTab" role="tablist">

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="all_claims" role="tab" aria-controls="all_claims" aria-selected="true" id="all_claims" :to="{ name: 'specialist_all_claims' }">
                    Все заявки
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="closed_claims" role="tab" aria-controls="closed_claims" aria-selected="true" id="closed_claims" :to="{ name: 'specialist_closed_claims' }">
                    Закрытые (Архивные) заявки
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="subcontractors_claims" role="tab" aria-controls="subcontractors_claims" aria-selected="true" id="subcontractors_claims" :to="{ name: 'specialist_subcontractors_claims' }">
                    Заявки Соиспонителей
                </router-link>
            </li>

        </ul>

        <div class="tab-content" id="specialistApplications">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class SpecialistApplications extends Vue {

    }
</script>

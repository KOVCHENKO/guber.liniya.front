<template>
    <div class="main-page">
        <ul class="nav nav-tabs" id="myTab" role="tablist">

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="created_claims" role="tab" aria-controls="created_claims" aria-selected="true" id="created_claims" :to="{ name: 'specialist_created_claims' }">
                    Новые
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="assigned_claims" role="tab" aria-controls="assigned_claims" aria-selected="true" id="assigned_claims" :to="{ name: 'specialist_assigned_claims' }">
                    В работе
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="executed_claims" role="tab" aria-controls="executed_claims" aria-selected="true" id="executed_claims" :to="{ name: 'specialist_executed_claims' }">
                    Выполненые
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="closed_claims" role="tab" aria-controls="closed_claims" aria-selected="true" id="closed_claims" :to="{ name: 'specialist_closed_claims' }">
                    Закрытые
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="subcontractors_claims" role="tab" aria-controls="subcontractors_claims" aria-selected="true" id="subcontractors_claims" :to="{ name: 'specialist_subcontractors_claims' }">
                    Соисполнитель
                </router-link>
            </li>

        </ul>

        <div class="tab-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {headings, plusButton} from '@/domain/util/interface/CommonInterface';

    @Component
    export default class SpecialistApplications extends Vue {

        constructor() {
            super();
            headings.title = 'Заявки';
            plusButton.visible = false;
        }

        public created() {
            this.$router.push({ name: 'specialist_created_claims' });
        }

    }
</script>

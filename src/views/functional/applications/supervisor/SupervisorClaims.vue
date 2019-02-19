<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="prepared_supervisor_claims" role="tab" aria-controls="home" aria-selected="true" id="prepared-tab" :to="{ name: 'prepared_supervisor_claims' }">
                    Текущие
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="editable_supervisor_claims" role="tab" aria-controls="home" aria-selected="true" id="editable-tab" :to="{ name: 'editable_supervisor_claims' }">
                    На редактировании
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="executable_supervisor_claims" role="tab" aria-controls="home" aria-selected="true" id="current-tab" :to="{ name: 'executable_supervisor_claims' }">
                    На выполнении
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="declined_supervisor_claims" role="tab" aria-controls="home" aria-selected="true" id="declined-tab" :to="{ name: 'declined_supervisor_claims' }">
                    Отказ
                </router-link>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <router-view></router-view>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {headings, plusButton} from '@/domain/util/interface/CommonInterface';

    @Component
    export default class SupervisorClaims extends Vue {

        @Provide()
        public activeClass: string = 'active';


        constructor() {
            super();
            headings.title = 'Все заявки';
            plusButton.visible = false;
            plusButton.title = 'Добавить заявку';
        }

        public created() {
            this.$router.push({ name: 'prepared_supervisor_claims' });
        }


    }
</script>

<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="prepared_claims" role="tab" aria-controls="home" aria-selected="true" id="current-tab" :to="{ name: 'prepared_dispatcher_claims' }">
                    Текущие
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="expired_claims" role="tab" aria-controls="home" aria-selected="true" id="expired-tab" :to="{ name: 'declined_dispatcher_claims' }">
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
    export default class DispatcherClaims extends Vue {

        @Provide()
        public activeClass: string = 'active';


        constructor() {
            super();
            headings.title = 'Все заявки';
            plusButton.visible = false;
            plusButton.title = 'Добавить заявку';
        }

        public created() {
            this.$router.push({ name: 'prepared_dispatcher_claims' });
        }


    }
</script>

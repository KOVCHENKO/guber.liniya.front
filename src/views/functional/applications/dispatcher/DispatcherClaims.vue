<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">

            <li class="nav-item">
                <router-link tag="a" class="nav-link" :class="{ active: expiredIsActive }" href="expired_claims" role="tab" aria-controls="home" aria-selected="true" id="expired-tab" :to="{ name: 'expired_claims' }">
                    Просроченные
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" :class="{ active: currentIsActive }" href="current_claims" role="tab" aria-controls="home" aria-selected="true" id="current-tab" :to="{ name: 'current_claims' }">
                    Текущие
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" :class="{ active: currentIsActive }" href="current_claims" role="tab" aria-controls="home" aria-selected="true" id="current-tab" :to="{ name: 'current_claims' }">
                    Закрытые
                </router-link>
            </li>

        </ul>

        <div class="tab-content" id="myTabContent">
            <router-view></router-view>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {headings, plusButton} from '@/domain/util/interface/CommonInterface';

    @Component
    export default class DispatcherClaims extends Vue {

        public expiredIsActive: boolean = true;
        public currentIsActive: boolean = true;


        constructor() {
            super();
            headings.title = 'Все заявки';
            plusButton.visible = false;
            plusButton.title = 'Добавить заявку';
        }


    }
</script>

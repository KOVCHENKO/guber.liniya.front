<template>

    <div class="main-page">
        <ul class="nav nav-tabs" id="myTab" role="tablist">

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="missed_calls" role="tab" aria-controls="home" aria-selected="true" id="current-tab" :to="{ name: 'missed_calls' }">
                    Пропущенные
                </router-link>
            </li>

            <li class="nav-item">
                <router-link tag="a" class="nav-link" href="answered_calls" role="tab" aria-controls="home" aria-selected="true" id="expired-tab" :to="{ name: 'answered_calls' }">
                    Принятые
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
    import {socket} from '@/bootstrap';


    @Component
    export default class Calls extends Vue {

        @Provide()
        public activeClass: string = 'active';


        constructor() {
            super();
            headings.title = 'Звонки';
            plusButton.visible = false;
        }

        public created() {
            this.$router.push({ name: 'missed_calls' });
        }


    }
</script>

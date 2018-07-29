<template>
    <div>
        <notifications></notifications>
        <TopMenu></TopMenu>

        <div id="main-desktop">
            <div id="main-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang ="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import CabinetState from '../../store/common/cabinet/types';
    import TopMenu from '@/components/common/Desktop/TopMenu.vue';

    @Component({
        components: {TopMenu},
    })
    export default class Desktop extends Vue {
        @State('cabinet')
        public cabinet!: CabinetState;

        @Action('getCabinets')
        public getCabinets: any;

        private created() {
            this.getCabinets();
        }
    }
</script>
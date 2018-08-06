<template>
    <div>
        <notifications></notifications>
        <TopMenu></TopMenu>

        <div id="main-desktop">
            <div id="main-container">
                <router-view></router-view>
            </div>
        </div>

        <button id="button-add" class="circular red" data-toggle="modal"
                :disabled="plusButton.disabled"
                :title="plusButton.title"
                @click="plusButton.clickAction">
            <i class="fa fa-plus"></i>
        </button>
    </div>
</template>

<script lang ="ts">
    import {plusButton, headings} from '../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
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

        @Provide()
        public plusButton = plusButton;

        constructor() {
            super();
            this.getCabinets();
            plusButton.title = 'Добавить';
            plusButton.disabled = true;
            headings.title = 'Рабочий стол';
            headings.subtitle = '';
        }

    }
</script>
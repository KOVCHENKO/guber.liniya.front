<template>

    <div class="content">

        <notifications></notifications>

        <header class="main-header" v-if="toolBarVisibility">
            <div class="header-container">
                <div class="header-content">
                    <div class="header-el">
                        <div class="topline"></div>
                        <nav>
                            <p class="title" id="main-title" @click="toolBarVisibility = false">
                                <b>П</b>РЯМАЯ<br><b>Л</b>ИНИЯ<br><b>Г</b>УБЕРНАТОРА
                            </p>
                        </nav>
                        
                        <nav class="header-nav">
                            <ul class="nav">
                                <span v-for="cabinet in cabinetState.cabinets" :key="cabinet.id">
                                    <li class="active"><a  @click="selectMenuItem(cabinet)">{{ cabinet.name }}</a></li>
                                </span>

                                <li><a>Профиль</a></li>
                                <li><a>Выйти</a></li>
                            </ul>
                        </nav>
                        
                        <div class="bottomline"></div>
                    </div>
                </div>
            </div>
        </header>

        <div class="overlay-frame">
            <div class="of-top"></div>
            <div class="of-bottom"></div>
            <div class="of-right"></div>
        </div>
        
        <div class="ed-homeblock">
            <div class="homeblock-container">
                <div class="homeblock-container-wrapper">
                    <div id="main-desktop">
                        <div id="main-container">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button id="button-add" class="circular grey" data-toggle="modal"
                :disabled="plusButton.disabled"
                :title="plusButton.title"
                @click="plusButton.clickAction">
            <i class="fa fa-plus"></i>
        </button>

    </div>
</template>

<script lang ="ts">
    import {plusButton, headings, mainToolbar} from '../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import CabinetState from '../../store/common/cabinet/types';

    @Component
    export default class Desktop extends Vue {
        @State('cabinet')
        public cabinetState!: CabinetState;

        @Action('getCabinets')
        public getCabinets: any;

        @Provide()
        public plusButton = plusButton;

        @Provide()
        public toolBarVisibility = mainToolbar.shown;

        constructor() {
            super();
            this.getCabinets();
            plusButton.title = 'Добавить';
            plusButton.disabled = true;
            headings.title = 'Рабочий стол';
            headings.subtitle = '';
        }

        private selectMenuItem(cabinet) {
            this.$router.push({ name: cabinet.route });
        }
    }
</script>
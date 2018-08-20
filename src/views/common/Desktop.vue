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
                                    <li v-bind:class="{ active: cabinet.route === $route.name }">
                                        <a  @click="selectMenuItem(cabinet)">{{ cabinet.name }}</a>
                                    </li>
                                </span>

                                <li><a>Профиль</a></li>
                                <li @click="logout"><a>Выйти</a></li>
                            </ul>
                        </nav>

                        <div class="bottomline"></div>
                    </div>
                </div>
            </div>
        </header>
        
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

        <button id="button-add" class="circular grey button-customer" data-toggle="modal"
                :disabled="plusButton.disabled"
                :title="plusButton.title"
                @click="plusButton.clickAction">
            <icon name="plus"></icon>
        </button>

    </div>
</template>

<script lang ="ts">
    import {plusButton, headings, mainToolbar} from '../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import CabinetState from '../../store/common/cabinet/types';
    import UserState from '../../store/common/user/types';
    // noinspection TypeScriptCheckImport
    import Icon from 'vue-awesome';
    import {registerAddIcon} from '../../domain/util/interface/Icons';

    registerAddIcon();

    @Component({
        components: {Icon},
    })
    export default class Desktop extends Vue {
        @State('cabinet')
        public cabinetState!: CabinetState;

        @State('user')
        public userState!: UserState;

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

        protected logout() {
            localStorage.removeItem('vuex');
            this.$router.push({ name: 'login' });
            location.reload();
        }

        private selectMenuItem(cabinet) {
            this.$router.push({ name: cabinet.route });
        }
    }
</script>
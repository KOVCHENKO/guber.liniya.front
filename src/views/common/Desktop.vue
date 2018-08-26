<template>

    <div class="content">

        <div class="button-curtail" @click="open"><img src="/img/menu.png" /></div>
        <notifications></notifications>

        <div class="wrapper">
            
            <div class="sidebar-left" :class="{ isOpenTable: isOpen }">
                <header class="main-header desktop" :class="{ isOpen: isOpen }">
                    <div class="header-container">
                        <div class="header-content">
                            <div class="button-curtail" @click="close"><img src="/img/arrow.png" /></div>
                            <div class="header-el">
                                <div class="topline"></div>
                                <p class="title"><span class="capital">У</span>МНЫЙ<br>
                                    <span class="capital">Г</span>РАЖДАНИН</p>

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
            </div>

            <div class="welcome-homeblock-container">
                <div class="welcome-homeblock-container-content">
                    <div class="homeblock-display-table">
                        <div class="container-straight-title">
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

        <!-- TODO: относится к компоненту DispatcherApplications.vue-->
        <create-application></create-application>

    </div>
</template>

<script lang ="ts">
    import {plusButton, headings, mainToolbar} from '../../domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import CabinetState from '../../store/common/cabinet/types';
    import UserState from '../../store/common/user/types';
    // noinspection TypeScriptCheckImport
    // import CreateApplication from '@/components/functional/applications/CreateApplication/CreateApplication.vue';
    import Icon from 'vue-awesome';
    import CreateApplication from '@/components/functional/applications/CreateApplication/CreateApplication.vue';
    import { registerAllIcons } from '../../domain/util/interface/Icons';

    registerAllIcons();

    @Component({
        components: {Icon, CreateApplication},
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

        @Provide()
        public isOpen: boolean = false;

        constructor() {
            super();
            this.getCabinets();
            plusButton.title = 'Добавить!';
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

        public open() {
            this.isOpen = false;
        }

        public close() {
            this.isOpen = true;
        }

    }
</script>
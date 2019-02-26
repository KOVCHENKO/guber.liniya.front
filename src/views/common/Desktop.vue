<template>

    <div class="content">

        <div id="menu-button" class="line-button left-top" @click="open"><img src="/img/menu.png" /></div>
        <notifications></notifications>

        <div class="wrapper">

            <div class="sidebar-left" :class="{ isOpenTable: isOpen }">
                <header class="main-header desktop" :class="{ isOpen: isOpen }">
                    <div class="header-container">
                        <div class="header-content">
                            <div class="line-button left-top" @click="close">
                                <img src="/img/arrow.png" />
                            </div>
                            <div class="header-el">
                                <div class="topline"></div>
                                <p class="title"><span class="capital">У</span>МНЫЙ<br>
                                    <span class="capital">Г</span>РАЖДАНИН</p>

                                    <nav class="header-nav">
                                        <ul class="cst-nav">
                                            <span v-for="cabinet in cabinetState.cabinets" :key="cabinet.id">
                                                <li v-bind:class="{ active: cabinet.routeName === $route.name }">
                                                    <a  @click="selectMenuItem(cabinet)">{{ cabinet.name }}</a>
                                                </li>
                                            </span>
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

                            <header-component></header-component>
                            <router-view></router-view>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="line-button right-bottom" data-toggle="modal"
                :title="plusButton.title"
                @click="plusButton.clickAction" v-if="plusButton.visible"><img src="/img/plus.png" /></div>

        <incoming-call-notification></incoming-call-notification>

    </div>
</template>

<script lang ="ts">
    import {plusButton, mainToolbar} from '@/domain/util/interface/CommonInterface';
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import CabinetState from '@/store/common/cabinet/types';
    import HeaderComponent from '@/components/common/Desktop/Header.vue';
    import IPaginationState from '@/store/util/pagination/types';
    import IncomingCallNotification from '@/components/functional/calls/calls/new/IncomingCallNotification.vue';
    import {socket} from '@/bootstrap';
    import CallState from '@/store/functional/call/types';

    @Component({
        components: {HeaderComponent, IncomingCallNotification},
    })
    export default class Desktop extends Vue {
        @State('cabinet') public cabinetState!: CabinetState;
        @State('pagination') public paginationState!: IPaginationState;

        // state для входящих звонков (incoming calls)
        @State('call') public callState!: CallState;

        @Action('getCabinets')
        public getCabinets: any;

        @Provide()
        public plusButton = plusButton;

        @Provide()
        public toolBarVisibility = mainToolbar.shown;

        @Provide()
        public isOpen: boolean = true;

        constructor() {
            super();
            this.getCabinets();
            plusButton.title = 'Добавить!';
            plusButton.visible = true;
        }

        protected logout() {
            localStorage.removeItem('vuex');
            this.$router.push({ name: 'login' });
            location.reload();
        }

        private selectMenuItem(cabinet) {
            // Обнулить настройки состояния приложения
            this.paginationState.currentPage = 1;
            this.close();
            this.$router.push(cabinet.route);
        }

        private open() {
            this.isOpen = false;
        }

        private close() {
            this.isOpen = true;
        }

        private created() {
            this.listenToEvents();
        }

        private listenToEvents() {
            socket.on('incoming_call', (data) => {
                this.callState.incomingCall.phone = data.call.phone;
                $('#incomingCallNotificationModal').modal('show');
            });
        }

    }
</script>

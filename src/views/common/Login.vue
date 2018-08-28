<!--suppress JSMethodCanBeStatic -->
<template>
    <div class="welcome">

        <div class="wrapper">

            <div class="sidebar-left">
                <header class="main-header">
                    <div class="header-container">
                        <div class="header-content">
                            <div class="header-el">
                                <div class="topline"></div>
                                <p class="title"><span class="capital">У</span>МНЫЙ<br>
                                    <span class="capital">Г</span>РАЖДАНИН</p>
                                <div class="bottomline"></div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            <div class="welcome-homeblock-container" v-if="!loginedCmptd">
                <div class="welcome-homeblock-container-content">
                    <div class="homeblock-display-table">
                        <div class="container-straight-title">
                            <p class="straight-title">Прямая связь с Правительством Астраханской области</p>
                            <h1 class="homeblock-title">Авторизация</h1>
                            <md-field class="md-field-email">
                                <label>Логин</label>
                                <md-input v-model="user.email"></md-input>
                            </md-field>
                            <br>
                            <md-field class="md-field-password">
                                <label>Пароль</label>
                                <md-input v-model="user.password" type="password"></md-input>
                            </md-field>
                            <br>
                            <div class="homeblock-container-button">
                                <div class="homeblock-button" @click="login">Войти</div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>

            <div class="welcome-homeblock-container" v-else>
                <div class="welcome-homeblock-container-content">
                    <div class="homeblock-display-table">
                        <div class="container-straight-title">
                            <p class="straight-title">Прямая связь с Правительством Астраханской области</p>
                            <div class="homeblock-container-button">
                                <div class="homeblock-button" @click="toDesktop">Рабочий стол</div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>

        </div>

        <img src="/img/quality-mark.png" class="quality-mark">
        <footer-component></footer-component>

	</div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import axios from 'axios';
    import { addAuthorizationHeader } from '../../domain/util/libraries/AxiosConfig';
    import { baseUrl } from '../../globals';
    import {Action, State} from 'vuex-class';
    import User from '../../domain/entities/common/interfaces/User';
    import UserState from '../../store/common/user/types';
    import FooterComponent from '@/components/common/Desktop/Footer.vue';
    import CabinetState from '../../store/common/cabinet/types';

    @Component({
        components: {FooterComponent},
    })
    export default class Login extends Vue {
        @Action('getUser')
        public getUser;

        @Provide()
        public user = {
            email: '',
            password: '',
        };

  public logined!: boolean;

        @State('user')
        private userState!: UserState;

        @State('cabinet')
        private cabinetState!: CabinetState;

        /**
         * 1. Залогиниться пользователем
         * 2. Получить токен и внести его в headers axios'a
         * 3. Получить залогиненного пользователя
         */
        public login() {
            axios.post(baseUrl + 'login', this.user).then((response) => {
                this.userState.token = 'Bearer ' + response.data.token;
                addAuthorizationHeader(this.userState);
                this.getUser();
            }).catch((error) => {
                alert(error);
            });
        }

        public toDesktop() {
            this.$router.push({ name: 'desktop' });
        }

        get loginedCmptd() {
            return this.userState.token !== '';
        }

    }

</script>
<style lang="scss">
    @import '../../../public/sass/app';
</style>
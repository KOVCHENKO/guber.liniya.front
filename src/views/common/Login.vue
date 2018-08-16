<!--suppress JSMethodCanBeStatic -->
<template>
    <div class="welcome">

        <div>
			
			<header-component></header-component>
			
			<div class="global-overlay">
				<div class="overlay">
					<div class="overlay-wrapper">
						<div class="overlay-inner"></div>
						<div class="overlay-background-dark"></div>
					</div>
				</div>
			</div>
			
			<div class="overlay-frame">
				<div class="of-top"></div>
				<div class="of-bottom"></div>
				<div class="of-right"></div>
			</div>
			
			<div class="ed-homeblock">
				<div class="homeblock-container">
					<div class="homeblock-container-wrapper">
						<div class="homeblock-container-content">
							<div>
								<h1 class="homeblock-title">Авторизация</h1>
								<p class="homeblock-container-input"><input class="homeblock-input" type="text" placeholder="Логин" v-model="user.email" /></p>
								<p class="homeblock-container-input"><input class="homeblock-input" type="password" placeholder="Пароль" v-model="user.password" /></p>
								<div class="homeblock-container-button">
									<div class="homeblock-button" @click="login">Войти</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
            <footer-component></footer-component>
			
		</div>

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
    import HeaderComponent from '@/components/common/Desktop/Header.vue';

    @Component({
        components: {FooterComponent, HeaderComponent},
    })
    export default class Login extends Vue {
        @Action('getUser')
        public getUser;

        @Provide()
        public user: User = {
            email: '',
            password: '',
        };

        @State('user')
        private userState!: UserState;

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

    }

</script>
<style lang="scss">
    @import '../../../public/sass/app';
</style>
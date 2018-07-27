<!--suppress JSMethodCanBeStatic -->
<template>
    <div class="welcome-page">

        <!-- Переключатель языка -->
        <button class="language"></button>

		<!-- Форма -->
        <div class="form">
			<h1>Логин!</h1>

			<!-- Логин -->
            <div class="row">
                <div class="col-sm-12 clearfix">
					<i class="fa fa-user"></i>
					<input type="text" name="email" v-model="user.email"/>
				</div>
            </div>

			<!-- Пароль -->
            <div class="row">
                <div class="col-sm-12 clearfix">
                    <i class="fa fa-user"></i>
                    <input type="password" name="password" v-model="user.password"/>
                </div>
            </div>

		</div>

        <!-- Кнопка входа и восстановления пароля -->
        <div class="row">
            <div class="col-sm-12 clearfix get-activate">
                <button id="login-btn" @click="login">
                    Войти
                </button>
            </div>
        </div>
		
	</div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import axios from 'axios';
    import { baseUrl } from '../../globals';
    import {State} from 'vuex-class';
    import UserState from '../../store/common/user/types';
    import User from '../../domain/entities/common/interfaces/User';

    @Component
    export default class Login extends Vue {
        @State('user')
        public userState!: UserState;

        @Provide()
        public user: User = {
            email: '',
            password: '',
        };

        public login() {
            axios.post(baseUrl + 'login', this.user).then((response) => {
                this.userState.user = response.data;
                this.$router.push({ name: 'desktop'});
            }).catch((error) => {
                alert(error);
            });
        }
    }

</script>
<style lang="scss">
    @import '../../../public/sass/app';
</style>
<!--suppress JSMethodCanBeStatic -->
<template>
    <div class="welcome">

		<!-- Форма -->
        <div class="form">
			<h1>Логин!</h1>
            <div id="user-form">

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

		</div>

        <!-- Кнопка входа -->
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
    import {Action, State} from 'vuex-class';
    import User from '../../domain/entities/common/interfaces/User';
    import UserState from '../../store/common/user/types';

    @Component
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

        public login() {
            axios.post(baseUrl + 'login', this.user).then((response) => {
                this.userState.token = 'Bearer ' + response.data.token;
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
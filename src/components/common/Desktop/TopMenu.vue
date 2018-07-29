<template>
    <div>

        <div id="top-menu">
            <span class="title">Меню администратора</span>
            <div class="sub-title"><i class="fa fa-angle-right"></i></div>
            <span class="sub-title">Менюшка сабтайтловая</span>

            <button class="right" title="Выход" @click="logout"><i class="fa fa-sign-out"></i></button>
            <router-link to="/admins/menu" tag="button" class="right" title="основное меню"><i class="fa fa-level-up"></i></router-link>
        </div>

    </div>
</template>

<script lang="ts">

    import {Provide, Vue} from 'vue-property-decorator';
    import Component from 'vue-class-component';
    import Cabinet from '@/domain/entities/common/interfaces/Cabinet';
    import axios from 'axios';

    @Component
    export default class TopMenu extends Vue {
        public subtitle: string = 'Психологическая платформа!!!';
        public avatar: string = '';
        public accordion: boolean = true;
        public leftMenuShow: boolean = false;

        @Provide() protected currentUserCabinet: Cabinet = {
            id: 0,
            name: '',
            icon: '',
            route: '',
        };

        protected logout() {
            axios.get('/logout').then((response) => {
                // logout route
            });
        }

    }
</script>
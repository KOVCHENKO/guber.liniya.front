<template>
    <div>
        <div id="top-menu">
            <span class="title">{{ headings.title }}</span>
            <div class="sub-title"><i class="fa fa-angle-right"></i></div>
            <span class="sub-title">{{ headings.subtitle }}</span>

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
    import {headings} from '../../../domain/util/interface/CommonInterface';

    @Component
    export default class TopMenu extends Vue {

        @Provide()
        public headings = headings;

        @Provide() protected currentUserCabinet: Cabinet = {
            id: 0,
            name: '',
            icon: '',
            route: '',
        };

        constructor() {
            super();
            headings.title = '';
            headings.subtitle = '';
        }

        protected logout() {
            axios.get('/logout').then(() => {
                // logout route
            });
        }

    }
</script>
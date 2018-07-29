import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/common/Login.vue';
import Desktop from './views/common/Desktop.vue';
import Menu from './views/common/Menu.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/', name: 'login', component: Login,
    },
    {
        path: '/desktop',
        name: 'desktop',
        component: Desktop,
        children: [
            {
                path: '/menu',
                name: 'menu',
                component: Menu,
            },
        ],
    },
  ],
});

<template>
    <div class="content">

        <header class="main-header">
            <div class="header-container">
                <div class="header-content">
                    <div class="header-el">
                        <div class="topline"></div>
                        <nav>
                            <p class="title">
                                <b>П</b>РЯМАЯ<br><b>Л</b>ИНИЯ<br><b>Г</b>УБЕРНАТОРА
                            </p>
                        </nav>
                        
                        <nav class="header-nav">
                            <ul class="nav">
                                <span v-for="cabinet in cabinetState.cabinets" :key="cabinet.id">
                                    <li class="active"><a  @click="selectMenuItem(cabinet)">{{ cabinet.name }}</a></li>
                                </span>

                                <li><a>Профиль</a></li>
                                <li><a>Выйти</a></li>
                            </ul>
                        </nav>
                        
                        <div class="bottomline"></div>
                    </div>
                </div>
            </div>
        </header>

        <div class="overlay-frame">
            <div class="of-top"></div>
            <div class="of-bottom"></div>
            <div class="of-right"></div>
        </div>
        
        <div class="ed-homeblock">
            <div class="homeblock-container">
                <div class="homeblock-container-wrapper">
                    <div>
                        <p>Контент</p>
                    </div>
                </div>
            </div>
        </div>
        
        <footer class="site-footer">
            <div class="container-fluid">
                <p class="copyright">© 2018 MCode</p>
            </div>
        </footer>

    </div>
</template>

<script lang="ts">
    import {plusButton, headings} from '../../domain/util/interface/CommonInterface';
    import {Component, Vue} from 'vue-property-decorator';
    import {State} from 'vuex-class';
    import CabinetState from '../../store/common/cabinet/types';

    @Component
    export default class Menu extends Vue {
        /**
         * Кабинет
         */
        @State('cabinet')
        public cabinetState!: CabinetState;

        public created() {
            plusButton.title = 'Добавить';
            plusButton.disabled = true;
            headings.title = 'Меню';
            headings.subtitle = 'Выбор кабинета';
        }

        private selectMenuItem(cabinet) {
            this.$router.push({ name: cabinet.route });
        }

    }
</script>
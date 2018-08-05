<template>
    <div>
        <span v-for="cabinet in cabinetState.cabinets" :key="cabinet.id">
            <button class="cabinet-item"
                @click="selectMenuItem(cabinet)">
                    <img :src="'/images/cabinets/' + cabinet.icon + '.png'"/>
                    <label class="cabinet-title">{{ cabinet.name }}</label>
            </button>
        </span>
    </div>
</template>

<script lang="ts">
    import {plusButton} from '../../domain/util/interface/CommonInterface';
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
        }

        private selectMenuItem(cabinet) {
            this.$router.push({ name: cabinet.route });
        }



    }
</script>
<template>
    <div>
        <span v-for="cabinet in cabinetState.cabinets" :key="cabinet.id">
            <button class="cabinet-item"
                @click="selectMenuItem(cabinet)">
                    <img src="/public/images/cabinets/5.png"/>
                    <label class="cabinet-title">{{ cabinet.name }}</label>
            </button>
        </span>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {State} from 'vuex-class';
    import CabinetState from '../../store/common/cabinet/types';

    @Component
    export default class Menu extends Vue {
        @State('cabinet')
        public cabinetState!: CabinetState;

        private selectMenuItem(cabinet) {
            this.$router.push({ name: cabinet.route });
        }

    }
</script>
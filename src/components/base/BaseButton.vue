<template>
    <div>
        <button v-if="interState.loading" type="button" :class="buttonClass" aria-label="Close" disabled>
            Ожидание
        </button>

        <button v-on="$listeners" v-else type="button" :class="buttonClass" aria-label="Close">
            <slot />
        </button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {State} from 'vuex-class';
    import IInterfaceState from '@/store/util/interface/types';

    @Component
    export default class BaseButton extends Vue {

        @State('interstate') public interState!: IInterfaceState;

        @Prop() public buttonClass: string;

    }
</script>

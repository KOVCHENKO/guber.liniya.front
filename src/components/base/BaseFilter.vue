<template>
    <div class="card cst-card" v-if="column.filter">
        <div>
            <div class="cst-float-right"><i class="fas fa-times container-icon" @click="column.filter = false"></i></div>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class BaseFilter extends Vue {

        @Prop() public column!: boolean;

    }
</script>
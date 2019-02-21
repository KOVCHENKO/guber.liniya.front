<template>
    <div class="card cst-card" v-if="column.filter">
        <div class="card-header">
            <div class="cst-float-right"><i class="fas fa-times container-icon" @click="column.filter = false"></i></div>
            <div class="cst-clear"></div>
        </div>
        <div class="card-body">
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

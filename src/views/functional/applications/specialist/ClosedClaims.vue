<template>
    <div class="tab-pane fade show active" id="current" role="tabpanel" aria-labelledby="closed_claims">
        
        Закрытые ( status = closed )

    </div>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class ClosedClaims extends Vue {}

</script>
